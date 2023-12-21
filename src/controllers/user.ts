import express, {Request, Response} from 'express'
import User from '../models/User'
import { StatusCodes as status } from 'http-status-codes';
import { BadRequestError } from '../errors';
import { obtainImageUrl } from './libs/utils';

// get single user details

export const getUserDetails = async (req:Request, res:Response) => {
 const user = req.user
 const userModal = await User.findById(user.id)
 if(!userModal){
  throw new BadRequestError('User not found')
 }
 

 //@ts-ignore
 userModal.password = undefined

 
 res.status(status.OK).json({
  user: userModal
 })
}

// update user details

export const updateUserDetails = async (req:Request, res:Response) => {
 const user = req.user
 const updatedUser = await  User.findByIdAndUpdate({ _id: user.id }, req.body, { new: true, runValidators: true })
 if(!updatedUser){
  throw new BadRequestError('User not found')
 }
 return res.status(status.OK).json({
  user: updatedUser
 })
}

// update user image

export const updateImage = async (req:Request, res:Response) => {

 const user = req.user
 const imgUrl = req.file?.path 
 if(!imgUrl){
  throw new BadRequestError('Please provide an image')
 }

 const img= obtainImageUrl(imgUrl)



 const updatedUser = await User.findByIdAndUpdate({ _id: user.id }, {img}, { new: true, runValidators: true })
 if(!updatedUser){
  throw new BadRequestError('User not found')
 }
 res.status(status.OK).json({
  user: updatedUser
 })
}