import {StatusCodes as status} from 'http-status-codes';
import CustomApiError from './CustomApiError';
class BadRequestError extends CustomApiError{
 statusCode: number;
 constructor(message:string){
  super(message);
  this.statusCode= status.BAD_REQUEST;
 }
}
export default BadRequestError;
