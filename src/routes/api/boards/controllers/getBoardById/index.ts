import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, NOT_FOUND, OK } from "http-status";
import { validationResult } from "express-validator";
import { getBoardByIdService } from "@services/boards";
import { NOT_FOUND_ID } from "@utils/const";

const getBoardById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    const errorContent = errors.array()[0];
    if (!errors.isEmpty()) return res.status(BAD_REQUEST).json({ message: errorContent.msg });
    const board = await getBoardByIdService({ _id: req.params.id });
    if (board === NOT_FOUND_ID) return res.status(NOT_FOUND).json({ message: NOT_FOUND_ID });
    return res.status(OK).json(board);
  } catch (error) {
    console.log("XCvxcvcxvcxv", error);
    next(error);
  }
};

export default getBoardById;
