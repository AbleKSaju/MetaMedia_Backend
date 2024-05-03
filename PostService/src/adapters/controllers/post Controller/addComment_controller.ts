import { Request, Response } from "express";
import { postProducer } from "../../../Events/kafkaProducer";
export default (dependecies: any) => {
  const { addComment_UseCase } = dependecies.useCase;
  const addCommentController = async (req: Request, res: Response) => {
    const { postId, userId, content, userName, userProfile } = req.body;
    const data = { postId, userId, content, userName, userProfile };

    const responce = await addComment_UseCase(dependecies).executeFunction(
      data
    );
    if (responce.status) {
      const data = {
        sender_id: userId,
        receiver_id: responce.data.userId,
        postId: responce.data._id,
        notificationType: "comment",
        postImage: responce.data.mediaUrl[0],
        comment: content,
      };
      console.log(data,"datadata");
      
      await postProducer(data, "Notification", "CommentPostNotification");
      res.status(200).json({ status: true, data: responce.data });
    } else {
      res.status(400).json({ status: false });
    }
  };
  return addCommentController;
};
