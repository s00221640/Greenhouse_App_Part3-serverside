import { Request, Response, NextFunction } from 'express';

export const authenticateKey = (req: Request, res: Response, next: NextFunction) => {
  //No key yet
  console.log("Authentication middleware triggered");
  next(); 
};
