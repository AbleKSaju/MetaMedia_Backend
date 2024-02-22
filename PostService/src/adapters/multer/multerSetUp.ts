import multer from 'multer';
import path from 'path';
import { Request } from 'express';
// import {} from '../../../public/postData'

// Define the destination and filename functions
const storage: multer.StorageEngine = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
        console.log('hiiiiiiiiiiiii');
        
        callback(null, path.join(__dirname, '../../../public/img'));
    },
    filename: function (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Create multer middleware
const upload = multer({ storage: storage });

export {
    upload
}