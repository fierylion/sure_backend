declare namespace Express {
 export interface Request extends Express.Request {
  user: {
   id: string;
   email: string;
  };
 }
}
