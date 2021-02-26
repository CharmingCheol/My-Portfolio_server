import { NextFunction, Request, Response } from "express";
import { OK } from "http-status";
import { CategorysService } from "@services/index";

const getCategorys = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryList = await CategorysService.getCategoryList();
    return res.status(OK).json(categoryList);
  } catch (error) {
    next(error);
  }
};

export default getCategorys;
