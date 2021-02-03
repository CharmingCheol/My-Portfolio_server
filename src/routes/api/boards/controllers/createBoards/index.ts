import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, CREATED } from "http-status";
import { validationResult } from "express-validator";
import { createBoardsService } from "@services/boards";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    const errorContent = errors.array()[0];
    if (!errors.isEmpty()) return res.status(BAD_REQUEST).json({ message: errorContent.msg });
    const post = await createBoardsService(req.body);
    return res.status(CREATED).json(post);
  } catch (error) {
    console.log("sdfsdfsdfsdfsawqewq", error);
    next(error);
  }
};
