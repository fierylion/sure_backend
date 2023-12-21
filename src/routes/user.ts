import express from 'express'
import { getUserDetails, updateUserDetails, updateImage } from '../controllers/user'
import upload from '../middleware/upload'
const router = express.Router()
router.route('').get(getUserDetails).patch(updateUserDetails)
router.route('/image').post(upload.single('img'),updateImage)

export default router
