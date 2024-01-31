import {UserData} from '../interfaces/userInterface'
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import {s3} from './s3'



const bucketName=process.env.BUCKET_NAME
const bucketRegion=process.env.BUCKET_REGIONE



export  const uploadImageToS3 = async (imageData: UserData['profile'], imageName: string): Promise<string> => {
    try {
        // Convert base64 image data to Buffer
        const imageBuffer = Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ''), 'base64');

        // Specify S3 upload parameters
        const params = {
            Bucket: bucketName,
            Key: imageName,
            Body: imageBuffer,
            ContentType: 'image/jpeg',
        };

        // Upload the image to S3
        const command = new PutObjectCommand(params);
        const result = await s3.send(command);

        // The S3 URL of the uploaded image
        const s3ImageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${imageName}`;
        
        return s3ImageUrl;
    } catch (error) {
        console.error('Error uploading image to S3:', error);
        throw error;
    }
};

