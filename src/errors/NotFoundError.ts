import {StatusCodes as status} from 'http-status-codes';
import CustomApiError from './CustomApiError';
class NotFoundError extends CustomApiError{
 statusCode: number;
 constructor(message:string){
  super(message);
  this.statusCode= status.NOT_FOUND;
 }
} 
export default NotFoundError;