import { Request, Response, NextFunction } from 'express';

export function userLogger(req: Request, res: Response, next: NextFunction): void {
  console.log(`Itinerary Request - ${req.method} ${req.path}`);
  next();
}
