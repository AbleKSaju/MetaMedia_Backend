
import User from "../database/schema"
import webpush from 'web-push'
import { subscribeToSNS ,publishToSNS} from "./aws";



async function generateVAPIDKeys() {
  const vapidKeys = await webpush.generateVAPIDKeys();
  console.log(vapidKeys,'THISIS VAPID KEYSS');
  
  return vapidKeys;
}

export default {
  createUser: async (data: any) => {
    try {
      console.log(data, "data from database");

      const userData = {
        "basicInformation.userId": data._id,
        "basicInformation.fullName": data.name,
        "profile.profileUrl": data?.profile,
        "basicInformation.email": data.email,
        "basicInformation.isGoogle": data.isGoogle,
        "basicInformation.isFacebook": data.isFacebook,
      };
      const response = await User.create(userData);
      console.log(response, "rees");

      if (response) {
        return { status: true, message: "user created sucessfull", response };
      } else {
        return { status: false, message: "user cretion failed" };
      }
    } catch (error) {
      console.log(
        "Error in the cretae user in the auth service / repositery ",
        error
      );
    }
  },

  createInterest: async (data: any, id: string) => {
    try {
      console.log(id, "iddd");
      const createInterest = await User.findOneAndUpdate(
        { "basicInformation.userId": id },
        { $set: { "profile.interests": data } }
      );
      console.log(createInterest, "SUCCESS");
      if (createInterest) {
        return { status: true, message: "Interest added" };
      }
      return { status: false, message: "Internal error" };
    } catch (error) {
      return error;
    }
  },

  finduser: async (email: string) => {
    console.log(email, "email from findUser");
    console.log(typeof email, "email from findUser");
    try {
      const finduser = await User.findOne({ "basicInformation.email": email });
      console.log(finduser, "findUser");
      if (finduser) {
        return { status: true, finduser };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log(
        "error in repositery authencation repo in userEmailexist",
        error
      );
    }
  },
  getAllUsers: async () => {
    let usersData: any = [];
    const users = await User.find({"basicInformation.fullName": { $ne: "Admin" }});
    console.log(users, "usersusersusersusersusersusers");

    Promise.all(
      users.map(async (data: any) => {
        console.log(data, "datassssss");
        const user = {
          receiverId: data.basicInformation.userId,
          email: data.basicInformation.email,
          name: data.basicInformation.fullName,
          profile: data?.profile.profileUrl,
        };
        usersData.push(user);
      })
    );
    console.log(usersData, "usersDatausersData");

    if (users) {
      return { status: true, data: usersData };
    } else {
      return { status: false };
    }
  },
  getUsersByName: async (name: string) => {
    if (name.trim() !== "") {
      const users = await User.find({
        "basicInformation.fullName": { $regex: "^" + name, $options: "i" },
      });
      if (users.length > 0) {
        return { status: true, data: users };
      } else {
        return { status: false };
      }
    } else {
      console.log("here kkk");

      return { status: false };
    }
  },

  getUserById: async (id: any) => {
    const user = await User.findOne({ "basicInformation.userId": id });
    if (user) {
      return { status: true, data: user };
    } else {
      return { status: false };
    }
  },

  followUser: async (currentUserId: string, followedUserId: string) => {
    const user: any = await User.findOne({
      "basicInformation.userId": currentUserId,
    });
    // const story = await User.findOne({ userId: currentUserId }).populate('basicInformation.fullName').exec();

    const userAlreadyFollows = user.socialConections.following.some(
      (connection: any) => connection.userId === followedUserId
    );
    console.log(
      userAlreadyFollows,
      "userAlreadyFollowsuserAlreadyFollowsuserAlreadyFollows"
    );
    if (userAlreadyFollows) {
      const updatedUser = await User.findOneAndUpdate(
        { "basicInformation.userId": currentUserId },
        { $pull: { "socialConections.following": { userId: followedUserId } } }
      );
      const updateFollowedUser = await User.findOneAndUpdate(
        { "basicInformation.userId": followedUserId },
        { $pull: { "socialConections.followers": { userId: currentUserId } } }
      );
      console.log(updatedUser, " updatedUser I MA DATA");
      if (updatedUser && updateFollowedUser) {
        return { status: true, message: "Unfollowed Success" };
      } else {
        return { status: false, message: "Failed" };
      }
    } else {
      const userDetails: any = await User.findOne({
        "basicInformation.userId": followedUserId,
      });
      const updatedUser = await User.findOneAndUpdate(
        { "basicInformation.userId": currentUserId },
        {
          $push: {
            "socialConections.following": {
              userId: followedUserId,
              profile: userDetails?.profile.profileUrl,
              fullName: userDetails.basicInformation.fullName,
            },
          },
        }
      );
      const updateFollowedUser = await User.findOneAndUpdate(
        { "basicInformation.userId": followedUserId },
        {
          $push: {
            "socialConections.followers": {
              userId: currentUserId,
              profile: user.profile.profileUrl,
              fullName: user.basicInformation.fullName,
            },
          },
        }
      );
      console.log(updatedUser, "updatedUserupdatedUserupdatedUserupdatedUser");
      if (updatedUser && updateFollowedUser) {
        return { status: true, message: "Followed Success" ,name:user.basicInformation.fullName};
      } else {
        return { status: false, message: "Failed" };
      }
    }
    
   
  },
  subscribeSNS:async(data:any)=>{
 
    const {deviceInfo,vapidPublicKey,userId}=data

try {

const userData=await User.findOne({'basicInformation.userId': userId})

if(!userData){
  return {status:false,message:"userData not found"}
}

console.log(deviceInfo,'DIIIVES INFOOOO');

const res= await subscribeToSNS(deviceInfo,vapidPublicKey,userId)
if(!res){
return {status:false,message:"Subscription failed"}
}

const topicArn="arn:aws:sns:us-east-1:211125388781:meta-media"
const message=`Hai ${userData.basicInformation?.fullName} `
const deviceType=deviceInfo.deviceType
const fistpubish =await publishToSNS(topicArn,message,userId,deviceType)

return {status:true,data:[]}

} catch (error) {
console.log(error,'EROOR');

return {status:false,message:`Error :${error}`}
}



  },
  generateVAPIDKeysForUser: async (data: any) => {
    try {
      const { userId } = data;
  
      // Find user by userId
      const userData:any = await User.findOne({ 'basicInformation.userId': userId });
      if (!userData) {
        return { status: false, message: "User is not found" };
      }
  
      // Generate VAPID keys
      const { publicKey, privateKey } = await generateVAPIDKeys();
  
      console.log(publicKey, privateKey);
      
      userData.pushNotificationTokens = {
        vapidPrivetKey: privateKey,
        vapidPublicKey: publicKey,
       
       
      };
    
  
     
      const updatedUser = await userData.save();
      console.log(updatedUser,'THS IS UPDATED USER');
      
      if (updatedUser) {
      
        
        return { status: true, data: publicKey };
      } else {
        return { status: false, message: "Something went wrong" };
      }
    } catch (error) {
      return { status: false, message: `Error: ${error}` };
    }
  },
  

  getUsersDataById: async (ids: any) => {
    console.log(ids, "idsids");
    const conversationUserData = Promise.all(
      ids.map(async (receiverId: any) => {
        console.log(receiverId, "receiverId.idreceiverId.id");

        const user: any = await User.findOne({
          "basicInformation.userId": receiverId.id,
        });
        console.log(user, "useruser");

        const userData = {
          id: user?.basicInformation?.userId,
          email: user?.basicInformation?.email,
          fullName: user?.basicInformation?.fullName,
          profile: user?.profile?.profileUrl,
        };
        return {
          user: {
            receiverId: userData.id,
            email: userData.email,
            fullName: userData.fullName,
            profile: userData?.profile,
          },
          conversationId: receiverId.conversationId,
        };
      })
    );
    return { status: true, data: await conversationUserData };
  },

  getAllUsersData: async () => {
    let usersData: any = [];
    const user: any = await User.find({"basicInformation.fullName": { $ne: "Admin" }});
    await user.map((data: any) => {
      console.log(
        data?.basicInformation?.blocked,
        "data?.basicInformation?.blocked"
      );

      const userData = {
        id: data?.basicInformation?.userId,
        email: data?.basicInformation?.email,
        mobile: data?.basicInformation?.phoneNumber,
        fullName: data?.basicInformation?.fullName,
        profile: data?.profile?.profileUrl,
        bio: data?.profile?.bio,
        blocked: data?.basicInformation?.blocked,
        createdAt:data.basicInformation.createdAt
      };
      usersData.push(userData);
    });
    if (usersData) {
      return { status: true, data: usersData };
    } else {
      return { status: false };
    }
  },

  getSearchUsers: async (user: string, userId: string) => {
    console.log(user, "UUUUUSSSEERRRSSSSSSS");

    let searchedUsers: any = [];
    const usersData: any = await User.find({
      $or: [
        {
          "basicInformation.fullName": {
            $regex: ".*" + user + ".*",
            $options: "i",
          },
        },
        {
          "basicInformation.userName": {
            $regex: ".*" + user + ".*",
            $options: "i",
          },
        },
      ],
      "basicInformation.fullName": { $ne: "Admin" }
    });
    

    await usersData.map(async (data: any) => {
      let isFollow = false;
      await data.socialConections.followers.map((data: any) => {
        console.log(data, "DATAaaa");
        if (data.userId == userId) {
          isFollow = true;
        }
      });

      const users = {
        id: data?.basicInformation?.userId,
        email: data?.basicInformation?.email,
        fullName: data?.basicInformation?.fullName,
        userName: data.basicInformation.userName,
        profile: data?.profile?.profileUrl,
        follow: isFollow,
      };
      searchedUsers.push(users);
    });
    if (searchedUsers.length) {
      return { status: true, data: searchedUsers };
    } else {
      return { status: false };
    }
  },

  ChangeUserStatus: async (userId: string) => {
    const user: any = await User.findOne({ "basicInformation.userId": userId });

    if (user) {
      const newBlockedValue = !user.basicInformation.blocked;
      const response: any = await User.findOneAndUpdate(
        { "basicInformation.userId": userId },
        { $set: { "basicInformation.blocked": newBlockedValue } },
        { new: true }
      );
      const blocked = response.basicInformation.blocked;
      if (response) {
        return { status: true, message: "Status Changed", userStatus: blocked };
      } else {
        return { status: false, message: "Status Not Changed" };
      }
    }
  },

  BlockAndUnblockUser: async (myId: string, userId: string) => {
    const userData: any = await User.findOne({ "basicInformation.userId": userId });
    const myData: any = await User.findOne({ "basicInformation.userId": myId });
    
    const profile = userData.profile?.profileUrl || null;
    const fullName = userData.basicInformation.fullName;
    const isBlocked = await myData.socialConections.blockedUsers.some((user:any) => user.userId === userId);    
    let response:any;
    if (isBlocked) {
      // User is already blocked, so remove from the blocked users array
      response = await User.findOneAndUpdate(
        { "basicInformation.userId": myId },
        { $pull: { "socialConections.blockedUsers": { userId: userId } } },
        { new: true }
      );
    } else {
      // User is not blocked, so add to the blocked users array
      response = await User.findOneAndUpdate(
        { "basicInformation.userId": myId },
        {
          $push: {
            "socialConections.blockedUsers": {
              userId: userId,
              profile: profile,
              fullName: fullName,
            },
          },
        },
        { new: true }
      );      
    }
    if (response) {
      console.log(response.socialConections ,"response.socialConections ");
      return { status: true, message: "Status Changed", data:response.socialConections };
    } else {
      return { status: false, message: "Status Not Changed", data:false };
    }
  },
  savePost: async (data: any) => {
    try {
      const { userId, postId } = data;
      const user: any = await User.findOne({
        "basicInformation.userId": userId,
      });

      if (user) {
        if (!user.acivity.saved.includes(postId)) {
          user.acivity.saved.push(postId);
        } else {
          const index = user.acivity.saved.indexOf(postId);
          if (index !== -1) {
            user.acivity.saved.splice(index, 1);
          }
        }

        const response = await user.save();
        if (response) {
          console.log(response);
          return { status: true, data: response };
        } else {
          return { status: false, message: "Error while saving post" };
        }
      } else {
        return { status: false, message: "User not found" };
      }
    } catch (error) {
      return { status: false, message: error };
    }
  },
};
