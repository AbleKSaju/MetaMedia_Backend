import mongoose, { Document, Schema } from 'mongoose';

interface Notification extends Document {
  sender_id: string;
  receiver_id:string;
  action_type: 'follow' | 'like' | 'comment' | 'call' | 'chat_message';
  action_details: {
    sender_name:string;
    post_id?: mongoose.Types.ObjectId;
    post_image?: string;
    comment_id?: mongoose.Types.ObjectId;
    comment?: string;
    message_type?: 'text' | 'image' |'video' | 'voice_note' |'file';
  };
  timestamp: Date;
  read_status: 'read' | 'unread';
}

const notificationSchema: Schema<Notification> = new Schema({
 sender_id: {
    type: String,
    
   
  },
  receiver_id:{
    type: String,
    
  },
  action_type: {
    type: String,
    enum: ['follow', 'like', 'comment', 'call', 'chat_message'],
    
  },
  action_details: {
    sender_name:String,
    post_id: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
    post_image: String,
    comment: String,
    message_type: {
      type: String,
      enum: ['text', 'image','video','voice_note','file']
    }
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  read_status: {
    type: String,
    enum: ['read', 'unread'],
    default: 'unread'
  }
});

const NotificationModel = mongoose.model<Notification>('Notification', notificationSchema);

export default NotificationModel;
