import NotificationModel from '../database/schema/notificationSchema'


export default {
  
  followNotification: async (data:any) => {
    try {

      console.log('HERRERRERE',data);
      
      const {sender_id,receiver_id,notificationType}=data

      const alreadyExists = await NotificationModel.exists({
        sender_id: data.sender_id,
        receiver_id: data.receiver_id,
        action_type: "follow"
      });

if(alreadyExists){
  console.log('ALredy exist');
  
  return {status:true}
}
      const newNotification = new NotificationModel({
       sender_id:sender_id,
       receiver_id:receiver_id,
       action_type: notificationType,
      });
       const response=await newNotification.save();
       if(response){
        console.log(response,'SAVE THE FOLLOWW');
        
        return {status:true,data:response}
       }else{
        return {status:false,message:"Notification creation failed"}
       }
      
    } catch (error) {
        console.error("Error creating follow notification:", error);
        return {status:false,message:`Error happence ${error}`}
    }
  },

  likeNotification: async (data:any) => {
    try {

        const {sender_id, receiver_id,notificationType,postId, postImage}=data
        const alreadyExists = await NotificationModel.exists({
          sender_id: data.sender_id,
          receiver_id: data.receiver_id,
          action_type: "like",
          "action_details.post_id": data.postId
        });

        if(alreadyExists){
          return {status:true}
        }
      const newNotification = new NotificationModel({
        sender_id: sender_id,
        receiver_id:receiver_id,
        action_type: notificationType,
        action_details: {
          post_id: postId,
          post_image: postImage
        }
      });
     const response= await newNotification.save();
     if(response){
        return {status:true,data:response}
       }else{
        return {status:false,message:"Notification creation failed"}
       }
      
    } catch (error) {
      console.error("Error creating like notification:", error);
      return {status:false,message:`Error happence ${error}`}
    }
  },

  commentNotification: async (data:any) => {
    try {
        const {sender_id, receiver_id, postId, postImage, comment,notificationType}=data


        const alreadyExists = await NotificationModel.exists({
          sender_id: data.sender_id,
          receiver_id: data.receiver_id,
          action_type: "comment",
          "action_details.post_id": data.postId
        });

        if(alreadyExists){
          return {status:true}
        }
      const newNotification = new NotificationModel({
        sender_id: sender_id,
        receiver_id:receiver_id,
        action_type: notificationType,
        action_details: {
        
            post_id: postId,
            post_image: postImage,
            comment: comment
        }
      });
      const response=await newNotification.save();
      if(response){
        return {status:true,data:response}
       }else{
        return {status:false,message:"Notification creation failed"}
       }
    } catch (error) {
      console.error("Error creating comment notification:", error);
      return {status:false,message:`Error happence ${error}`}
    }
  },

  callNotification: async (data:any) => {
    try {
      const {sender_id, receiver_id,sender_name,notificationType}=data
      const newNotification = new NotificationModel({
        sender_id: sender_id,
        receiver_id:receiver_id,
        action_type: notificationType,
        action_details: {
            sender_name: sender_name
        }
      });
     const response= await newNotification.save();
     if(response){
        return {status:true,data:response}
       }else{
        return {status:false,message:"Notification creation failed"}
       }
     
    } catch (error) {
      console.error("Error creating call notification:", error);
      return {status:false,message:`Error happence ${error}`}

    }
  },

  messageNotification: async (data:any) => {
    try {
        const {sender_id, receiver_id,sender_name,messageType,notificationType}=data
      const newNotification = new NotificationModel({
        sender_id: sender_id,
        receiver_id:receiver_id,
        action_type: notificationType,
        action_details: {
            sender_name: sender_name,
            message_type: messageType
        }
      });
      const response=await newNotification.save();
      if(response){
        return {status:true,data:response}
       }else{
        return {status:false,message:"Notification creation failed"}
       }
    } catch (error) {
        console.error("Error creating message notification:", error);
        return {status:false,message:`Error happence ${error}`}
    }
  },
  getNotificationOfUser:async(userId:any)=>{


    try {
      const response=await NotificationModel.find({receiver_id:userId}).sort({timestamp:-1})
      if(response){
        return {status:true,data:response}
      }else {
         return {status:false,message:"NOtifications not found"}
      }
    } catch (error) {
      
    }
  }
}
