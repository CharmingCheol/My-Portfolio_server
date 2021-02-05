import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "http-status";

export function validateErrorHandler(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  const errorContent = errors.array()[0];
  if (!errors.isEmpty()) return res.status(BAD_REQUEST).json({ message: errorContent.msg });
  next();
}

export function internelServerErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
}
