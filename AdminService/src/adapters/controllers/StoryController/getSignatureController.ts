import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


export default (dependencies: any) => {
  const getSignatureController = (req: Request, res: Response) => {
    console.log(req.body,"req.bodyreq.body");
    
    const { folder } = req.body;
    console.log(folder,"folderfolder");
    

    try {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const cloudinaryApiSecret: any = process.env.CLOUDINARY_API_SECRET;

      const signature = cloudinary.utils.api_sign_request(
        {
          timestamp,
          folder,
        },
        cloudinaryApiSecret
      );
console.log(timestamp, signature ,"timestamp, signature ");

      res.status(200).json({ status: true, timestamp, signature });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: error });
    }
  };
  return getSignatureController;
};
