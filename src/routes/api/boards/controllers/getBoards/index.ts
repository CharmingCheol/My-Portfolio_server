import { NextFunction, Request, Response } from "express";
import { OK } from "http-status";
import { BoardsService } from "@services/index";

const getBounds = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page } = req.query;
    const retypedPage = parseInt(page as string, 10);
    const boardList = await BoardsService.getBoards({ page: retypedPage });
    return res.status(OK).json(boardList);
  } catch (error) {
    next(error);
  }
};

export default getBounds;
