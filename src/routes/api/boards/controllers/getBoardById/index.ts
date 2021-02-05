import { NextFunction, Request, Response } from "express";
import { NOT_FOUND, OK } from "http-status";
import { getBoardByIdService } from "@services/boards";
import { NOT_FOUND_ID } from "@utils/const";

const getBoardById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const board = await getBoardByIdService({ _id: req.params.id });
    if (board === NOT_FOUND_ID) return res.status(NOT_FOUND).json({ message: NOT_FOUND_ID });
    return res.status(OK).json(board);
  } catch (error) {
    next(error);
  }
};

export default getBoardById;
