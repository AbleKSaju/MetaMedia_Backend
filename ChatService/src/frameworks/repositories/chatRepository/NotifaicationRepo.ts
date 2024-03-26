import NotificationModel from '../database/schema/notificationSchema'


export default {
  followNotification: async (data:any) => {
    try {
      const {sender_id,receiver_id,notificationType,sender_name}=data
      const newNotification = new NotificationModel({
       sender_id:sender_id,
       receiver_id:receiver_id,
        action_type: notificationType,
        action_details: {
            sender_name: sender_name
        }
      });
       const response=await newNotification.save();
       if(response){
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

        const {sender_id, receiver_id,notificationType, sender_name,postId, postImage}=data
      const newNotification = new NotificationModel({
        sender_id: sender_id,
        receiver_id:receiver_id,
        action_type: notificationType,
        action_details: {
          sender_name: sender_name,
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
        const {sender_id, receiver_id, postId, postImage, comment,sender_name,notificationType}=data
      const newNotification = new NotificationModel({
        sender_id: sender_id,
        receiver_id:receiver_id,
        action_type: notificationType,
        action_details: {
            sender_name: sender_name,
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
  }
}
