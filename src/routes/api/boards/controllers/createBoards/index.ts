import { NextFunction, Request, Response } from "express";
import { CREATED } from "http-status";
import { createBoardsService } from "@services/boards";
import { createCategoryService } from "@services/categorys";
import replaceCategory from "@utils/replaceCategory";

const createBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.category = replaceCategory({ text: req.body.category });
    await createCategoryService({ category: req.body.category });
    const post = await createBoardsService(req.body);
    return res.status(CREATED).json(post);
  } catch (error) {
    next(error);
  }
};

export default createBoard;
