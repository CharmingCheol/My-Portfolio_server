import { NextFunction, Request, Response } from "express";
import { OK } from "http-status";
import { BoardsService } from "@services/index";

const getBoardById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const board = await BoardsService.getBoardById({ id: req.params.id });
    return res.status(OK).json(board);
  } catch (error) {
    next(error);
  }
};

export default getBoardById;
