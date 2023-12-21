import { StatusCodes as status } from "http-status-codes";
class CustomApiError extends Error{
 statusCode:number;
 constructor(message:string){
  super(message)
   this.statusCode = status.INTERNAL_SERVER_ERROR;
 }
}
export default CustomApiError;