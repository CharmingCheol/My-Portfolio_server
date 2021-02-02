import { Request, Response, NextFunction } from "express";
import { INTERNAL_SERVER_ERROR } from "http-status";

export function internelServerErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
}
