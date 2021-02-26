import { NextFunction, Request, Response } from "express";
import { OK } from "http-status";
import { BoardsService } from "@services/index";

const getCategoryBoards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const retypedPage = parseInt(req.query.page as string, 10);
    const boardList = await BoardsService.getCategoryBoards({ category: req.params.category, page: retypedPage });
    return res.status(OK).json(boardList);
  } catch (error) {
    next(error);
  }
};

export default getCategoryBoards;
