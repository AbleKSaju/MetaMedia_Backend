
import multer from "multer"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "public/profile/")
  },  
  filename: (req, file, cb) => {
    console.log("img",file,"IMAGE DETAILS");
    cb(null, Date.now() + file.originalname)
  },
})


export const upload = multer({
    storage:storage
})
