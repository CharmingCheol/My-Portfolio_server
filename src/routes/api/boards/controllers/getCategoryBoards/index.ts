import { NextFunction, Request, Response } from "express";
import { OK } from "http-status";
import { getCategoryBoardsService } from "@services/boards";

const getCategoryBoards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const retypedPage = parseInt(req.query.page as string, 10);
    const boardList = await getCategoryBoardsService({ category: req.params.category, page: retypedPage });
    return res.status(OK).json(boardList);
  } catch (error) {
    next(error);
  }
};

export default getCategoryBoards;
