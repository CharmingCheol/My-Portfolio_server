import { Request, Response, NextFunction } from "express";
import { NOT_FOUND } from "http-status";
import { NOT_FOUND_ID } from "@utils/const";
import boardsModel from "@models/boards";

const checkNotFoundID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await boardsModel.findById(req.params.id);
    if (!result) throw NOT_FOUND_ID;
    next();
  } catch (error) {
    return res.status(NOT_FOUND).json({ message: error });
  }
};

export default checkNotFoundID;
