import express from 'express'
import { loginUser, registerUser, provideAccessToken } from '../controllers/auth'
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/refresh').get(provideAccessToken)
export default router