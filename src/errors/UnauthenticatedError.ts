import {StatusCodes as status} from 'http-status-codes';
import CustomApiError from './CustomApiError';
class UnauthenticatedError extends CustomApiError{
 statusCode: number;
 constructor(message:string){
  super(message);
  this.statusCode= status.UNAUTHORIZED;
 }
}
export default UnauthenticatedError;