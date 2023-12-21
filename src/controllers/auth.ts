import User from '../models/User';
import {BadRequestError, UnauthenticatedError} from '../errors';
import {StatusCodes} from 'http-status-codes';
import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import { UserTypes } from '../types';


// register new user function

export const registerUser = async (req:Request, res:Response) => {
 const user:UserTypes = await User.create({...req.body});
 user.password = undefined;
 res
   .status(StatusCodes.CREATED)
   .json({
     userDetails:user,
     backendTokens: user.createJwtToken(),
   }) 
}

//Login single user function

export const loginUser = async (req:Request, res:Response) => {
 const {email, password} = req.body;
 if(!email || !password){
  throw new BadRequestError('Please provide email and password');
 }
 const user:UserTypes|null= await User.findOne({email});
 if(!user){
  throw new UnauthenticatedError('Invalid credentials');
 } 
 const isPasswordCorrect = await user.verifyPassword(password);
 if(!isPasswordCorrect){
  throw new UnauthenticatedError('Invalid credentials');
 }
 user.password = undefined;
 res.status(StatusCodes.OK).json({userDetails:user,backendTokens:user.createJwtToken()});
}

//give new  access token function

export const provideAccessToken = async (req:Request, res:Response) => {
 const reqHeader = req.headers.authorization;
 if(!reqHeader || !reqHeader.startsWith('Refresh')){
  throw new UnauthenticatedError('Invalid credentials');
 }
 try{
 const refreshToken = reqHeader.split(' ')[1];
 const decoded  = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as {id:string, email:string};
 const user:UserTypes|null = await User.findById(decoded.id);
 if(!user){
  throw new UnauthenticatedError('Invalid credentials');
 }
 user.password = undefined;
 return res.status(StatusCodes.OK).json({userDetails:user, backendTokens:user.createJwtToken()});

 }catch(err){
  throw new UnauthenticatedError('Invalid credentials');
 }

 
}