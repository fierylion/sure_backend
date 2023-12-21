import { CustomApiError } from "../errors";
import { StatusCodes as status } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import mongoose from 'mongoose'

interface ErrorCustom extends Error{
 code?:number;
 keyPattern?:{};
}
const errorHandlerMiddleware = ( err:ErrorCustom, req:Request, res:Response, next:NextFunction ) => {
 console.log(err)
 let customError = {
  statusCode:(err instanceof CustomApiError) ? err.statusCode : status.INTERNAL_SERVER_ERROR,
  message: err.message || 'Something went wrong, please try again later'
 }
 if(err instanceof CustomApiError){
  return res.status(customError.statusCode).json({error:customError.message});

 }
 if(err instanceof mongoose.Error.ValidationError){

  let error = Object.values(err.errors).map((item)=>{
   return item.message;
  }).join(' , ')

  return res.status(status.BAD_REQUEST).json({error})
 }
 if(err instanceof mongoose.Error.CastError){
  const error = `Invalid ${err.path}: ${err.value}`;
  return res.status(status.BAD_REQUEST).json({error})

 }
 if(err && err.code === 11000 && err.keyPattern){
  console.log(err.keyPattern)
  const error = `Already exists an account with this ${Object.keys(err.keyPattern)[0]}`;
  return res.status(status.BAD_REQUEST).json({error})
 }
 return res.status(customError.statusCode).json({error:customError.message});
}
export default errorHandlerMiddleware;