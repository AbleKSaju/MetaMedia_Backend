import multer from "multer"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "Public/Chat/")
  },  
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  },
})

export const upload = multer({
    storage:storage
})