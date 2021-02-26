import { Request, Response, NextFunction } from "express";
import { NO_CONTENT } from "http-status";
import { BoardsService, CategorysService } from "@services/index";

const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await CategorysService.decreaseCategory({ category: req.params.category });
    await BoardsService.deleteBoard({ id: req.params.id });
    return res.status(NO_CONTENT).json({ message: "The board has been deleted" });
  } catch (error) {
    next(error);
  }
};

export default deleteBoard;
