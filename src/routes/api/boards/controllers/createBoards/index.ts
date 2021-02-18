import { NextFunction, Request, Response } from "express";
import { CREATED } from "http-status";
import { createBoardsService } from "@services/boards";
import { createCategoryService } from "@services/categorys";

export function checkCategory(text: string) {
  if (/[a-z|A-Z]/.test(text)) {
    return text.toLowerCase().replace(/^[a-z|A-Z]/, (letter) => letter.toUpperCase());
  }
  return text;
}

const createBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.category = checkCategory(req.body.category);
    await createCategoryService({ category: req.body.category });
    const post = await createBoardsService(req.body);
    return res.status(CREATED).json(post);
  } catch (error) {
    next(error);
  }
};

export default createBoard;
