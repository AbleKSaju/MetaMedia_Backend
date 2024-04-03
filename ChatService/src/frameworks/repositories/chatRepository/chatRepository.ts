import schema from "../database/schema";
import { io } from "../../../app";

export default {
  addNewConversation: async (senderId: string, receiverId: string) => {
    try {
      let response: any;
      const data = await schema.Conversation.find({
        members: [senderId, receiverId],
      });
      if (!data.length) {
        response = await schema.Conversation.create({
          members: [senderId, receiverId],
        });
      }
      if (data || response) {
        return {
          status: true,
          message: "conversation created",
          data: data ?? response,
        };
      } else {
        return { status: false, message: "Error occur" };
      }
    } catch (error) {
      console.log(error, "ER");
      return { error };
    }
  },

  isConversationExist: async (senderId: string, receiverId: string) => {
    try {
      console.log(senderId, receiverId, "USER");

      const response = await schema.Conversation.findOne({
        members: { $all: [senderId, receiverId] },
      });

      if (response) {
        return { status: true, message: "conversation Exist" };
      } else {
        return { status: false, message: "conversation not Exist" };
      }
    } catch (error) {
      return { error };
    }
  },

  getConversations: async (userId: string) => {
    try {
      const receiverIds: any = [];
      const conversations: any = await schema.Conversation.find({
        members: { $in: [userId] },
      });
      Promise.all(
        conversations
          .sort((a: any, b: any) => b.lastUpdate - a.lastUpdate)
          .map(async (conversation: any) => {
            const id: string = conversation.members.find(
              (member: string) => member !== userId
            );
            receiverIds.push({
              id: id,
              conversationId: conversation._id,
              lastUpdate: conversation.lastUpdate,
            });
          })
      );

      if (receiverIds.length) {
        return { status: true, message: "receivers Found", data: receiverIds };
      } else {
        return { status: false, message: "receivers not Found", data: false };
      }
    } catch (error) {
      console.log(error, "ER");
      return { status: false, message: error, data: false };
    }
  },

  createMessage: async ({ conversationId, senderId, message,lastUpdate }: any) => {
    try {
      const response = await schema.Messages.create({
        conversationId,
        senderId,
        message,
        lastUpdate
      });
      if (response) {
        await schema.Conversation.findByIdAndUpdate(conversationId, {
          lastUpdate:lastUpdate,
        });
        return { status: true, message: "Message sent successfully" };
      } else {
        return { status: false, message: "Message not send" };
      }
    } catch (error) {
      return { status: false, message: error };
    }
  },

  getMessages: async (
    conversationId: string,
    senderId: string,
    receiverId: string
  ) => {
    try {
      console.log("I MA getMessages");
      const checkMessages = async (conversationId: string) => {
        const messages = await schema.Messages.find({ conversationId });
        const messageUserData = Promise.all(
          messages.map(async (message) => {            
            return {
              messageId: message._id,
              senderId: message.senderId,
              message: message.message,
              time: message.createdAt,
              type: message?.messageType
            };
          })
        );

        return { status: true, data: await messageUserData };
      };

      if (conversationId === "new") {
        const checkConversation: any = await schema.Conversation.find({
          members: { $all: [senderId, receiverId] },
        });

        if (checkConversation.length > 0) {
          await checkMessages(checkConversation[0]._id);
        } else {
          return { status: true, data: [] };
        }
      } else {
        return await checkMessages(conversationId);
      }
    } catch (error) {
      console.log(error, "ERR");

      return { status: false, data: true };
    }
  },

  CreateNewgroup: async (data: any) => {
    console.log(data,'THIS IS SDATAAA_________');
    
    const { title, description, membersData, admin, image, adminName } = data;

    try {
      const updatedMembers:any=[...membersData,admin]
      
     
const GroupExist=await schema.GroupChat.findOne({name:title})
if(GroupExist){
   return {status:false,message:"Group in this name aleady exist"}
}


console.log(updatedMembers,'--------LLLLLLLLL_____');


      const Group = new schema.GroupChat({
        name: title,
        description: description,
        profile: image,
        members: updatedMembers,
        admins: admin,
      });

      const response: any = await schema.GroupChat.create(Group);

      if (response) {

      
          io.to(response._id).emit(`GroupChat`, {
            group_id: response._id,
            sender_id: admin,
            content: `Group "${title}" created by ${adminName}`,
            type: "text",
            timestamp: new Date(),
            metadata: {},
          });
        

        const groupMessage = new schema.GroupMessage({
          group_id: response._id,
          sender_id: admin,
          content: `Group "${title}" created by ${adminName}`,
          type: "text",
          timestamp: new Date(),
          metadata: {},
        });

        await groupMessage.save();

        return { status: true, data: response };
      } else {
        return { status: false, message: "New Group Creation failed" };
      }
    } catch (error) {
      console.log("EROOR :", error);

      return { status: false, message: `Error :${error}` };
    }
  },

  getAllGroupsOfUser: async (userId: any) => {
    try {
      const groupData = await schema.GroupChat.find({
        members: { $all: [userId] },
      });

      if (groupData) {
        return { status: true, data: groupData };
      } else {
        return { status: false, message: "Group Data Not found.." };
      }
    } catch (error) {
      console.log("EROOR", error);

      return { status: false, message: `Error :${error}` };
    }
  },

  deleteMessage: async (messageId: string) => {
    try {
      
      const messages = await schema.Messages.findByIdAndDelete(messageId)
      if (messages) {
        return { status: true, message: "This Message was deleted"};
      } else {
        return { status: false, message: "NO data found" };
      }
    } catch (error) {
      return { status: false, message: `Eroor: ${error}` };
    }
  },

  getGroupMessages: async (groupId: any) => {
    try {
      const messages = await schema.GroupMessage.find({ group_id: groupId });
      if (messages) {
        return { status: true, data: messages };
      } else {
        return { status: false, message: "NO data found" };
      }
    } catch (error) {
      return { status: false, message: `Eroor: ${error}` };
    }
  },
  getGroupDataById: async (groupId: any) => {
    try {
      const response = await schema.GroupChat.findById(groupId);

      if (response) {
        return { status: true, data: response };
      } else {
        return { status: false, message: "No Data Found" };
      }
    } catch (error) {
      return { status: false, message: `Eroor : ${error}` };
    }
  },
  sendGroupMessage: async (data: any) => {
    const { group_id, sender_id, content, type, metadata } = data;
    try {
      const groupData: any = await schema.GroupChat.findById(group_id);
      if (!groupData) {
        return { status: false, message: "No group data found" };
      }
      const GroupMessageData = new schema.GroupMessage({
        content,
        group_id,
        metadata,
        sender_id,
        type
        })

        const emitData={
          group_id,
          sender_id,
          content,
          type,
          metadata
        }

        
      const responce = await GroupMessageData.save();
      if (responce) {
        return { status: true, data: responce };
      } else {
        return { status: false, message: "Error while create Group message" };
      }
    } catch (error) {
      return { status: false, message: `Error : ${error}` };
    }
  },

  singleUserSendFile: async (data:any,conv:any) => {
      try {
        console.log(data,"convconvconvconvconvconvconv");
        
        const {senderId,type,filename} = data
        console.log(type,"YTTTPPE");
        
        const response = await schema.Messages.create({
          conversationId:conv,
          senderId,
          message:filename,
          messageType:type
        });
        if (response) {
          const data = await schema.Conversation.findByIdAndUpdate(conv, {
            lastUpdate: Date.now(),
          });
          console.log(data,"datadatadatadatadata");
          
          return { status: true, message: "Message sent successfully",data:filename };
        } else {
          return { status: false, message: "Message not send" };
        }
      } catch (error) {
        return { status: false, message: error };
      }
  },
};

