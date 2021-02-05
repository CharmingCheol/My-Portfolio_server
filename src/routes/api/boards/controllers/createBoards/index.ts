import { NextFunction, Request, Response } from "express";
import { CREATED } from "http-status";
import { createBoardsService } from "@services/boards";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await createBoardsService(req.body);
    return res.status(CREATED).json(post);
  } catch (error) {
    next(error);
  }
};
