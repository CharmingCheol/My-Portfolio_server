import { Request, Response, NextFunction } from "express";
import { OK } from "http-status";
import { BoardsService } from "@services/index";

const getCategoryBoardsCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postCount = await BoardsService.getCategoryBoardsCount({ category: req.params.category });
    return res.status(OK).json(postCount);
  } catch (error) {
    next(error);
  }
};

export default getCategoryBoardsCount;
