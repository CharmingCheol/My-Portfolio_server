import { NextFunction, Request, Response } from "express";
import { OK } from "http-status";
import { getBoardsService } from "@services/boards";

const getBounds = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page } = req.query;
    const retypedPage = parseInt(page as string, 10);
    const boardList = await getBoardsService({ page: retypedPage });
    return res.status(OK).json(boardList);
  } catch (error) {
    next(error);
  }
};

export default getBounds;
