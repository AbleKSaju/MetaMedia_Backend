import multer from "multer"
import {Request,Response} from 'express'
const storage = multer.diskStorage({
  destination: (req:Request, file:any, cb:any) => {
    return cb(null, "server/public/images/")
  },
  filename: (req, file, cb) => {
    console.log(file,"IMAGE DETAILS");
    cb(null, Date.now() + file.originalname)
  },
})


export const upload = multer({
    storage:storage
})