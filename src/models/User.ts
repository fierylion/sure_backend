import mongoose, {Document} from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {NextFunction} from 'express'

interface UserDocument extends Document {
 firstName: string;
 lastName: string;
  mobile: string;
 email: string;
 img:string;

 password: string;
 createJwtToken(): {accessToken:string, refreshToken:string};
 verifyPassword(enteredPassword:string): Promise<boolean>;
}
const UserShema = new mongoose.Schema<UserDocument>({
 firstName: {
   type: String,
   required: [true, 'Please provide first name']
 },
 lastName: {
   type: String,
   required: [true, 'Please provide last name'],
 },
 mobile:{
    type: String,
    required: [true, 'Please provide mobile number'],
    unique: true,
    maxlength: [14, 'Mobile number cannot be longer than 14 characters'],
 },
 img:{
  type:String,
  default:'/static/images/user.png'
  

 },
  email: {
    type: String,
    required: [true, 'Please provide email address'],
    unique:true,
    lowercase: true,
  },

  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: true,
  },
})

//@ts-ignore
UserShema.pre('save', async function ( this:UserDocument,next:NextFunction) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
})





UserShema.methods.createJwtToken = function () {
  const accessToken = jwt.sign({id: this._id, email:this.email}, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_SECRET_LIFETIME!,
  });
  const refreshToken = jwt.sign({id: this._id, email:this.email}, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_LIFETIME!,
  });

  const expiresIn = process.env.JWT_SECRET_LIFETIME!;

  const refreshExpiresIn = process.env.JWT_REFRESH_LIFETIME!;

  const currentDate = new Date();
  const accessExpirationDate = new Date(currentDate.getTime() + (parseInt(expiresIn) * 24 * 60 * 60 * 1000));
  const refreshExpirationDate = new Date(currentDate.getTime() + (parseInt(refreshExpiresIn) * 24 * 60 * 60 * 1000));

  return {
    accessToken,
    refreshToken,
    accessExpiresIn: accessExpirationDate.toISOString(),
    refreshExpiresIn: refreshExpirationDate.toISOString()
  };
}

UserShema.methods.verifyPassword = async function (this:UserDocument, enteredPassword:string) {
 
 return await bcrypt.compare(enteredPassword, this.password);
}
export default mongoose.model<UserDocument>('User', UserShema);