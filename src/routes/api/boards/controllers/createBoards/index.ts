import { NextFunction, Request, Response } from "express";
import { createBoardsService } from "@services/boards";

function isError(post): post is (string | number)[] {
  if (post.length === 2) return true;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await createBoardsService(req.body);
    if (isError(post)) return res.status(400).json({ message: post[1] });
    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
