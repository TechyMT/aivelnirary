import { Request, Response, NextFunction } from 'express';

export function userLogger(req: Request, res: Response, next: NextFunction): void {
  console.log(`Place Request - ${req.method} ${req.path}`);
  next();
}
