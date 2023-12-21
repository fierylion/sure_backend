import path from 'path'
import multer from 'multer'
import { Request } from 'express'
const storage = multer.diskStorage({
 destination: function(req:Request, file, cb) {
   const pathDir = path.dirname(__dirname)
    const uploadPath = path.join(pathDir, 'public') 
   cb(null, uploadPath)

 },
 filename: function(req, file, cb) {
  const fileName = Date.now() + '_' + file.originalname
   cb(null, fileName)
 },
})
const upload = multer({ storage })
export default upload
