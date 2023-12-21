import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UnauthenticatedError
 } from '../errors';

 
 const  validateTokenMiddleware = (strict=true)=>{  
  return async (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')){
   if(strict) throw new UnauthenticatedError('Authentication invalid');
   else return next();

  }

  try{
   const token = authHeader.split(' ')[1];
   const decoded = jwt.verify(token, process.env.JWT_SECRET!);
   const {id, email} = decoded as {id:string, email:string};
   req.user = {id, email};
   next();
  } catch (error) {
  throw new UnauthenticatedError('Authentication invalid');
  }
 }
}
 export default validateTokenMiddleware;