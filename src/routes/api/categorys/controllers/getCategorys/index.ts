import { NextFunction, Request, Response } from "express";
import { OK } from "http-status";
import { getCategorysService } from "@services/categorys";

const getCategorys = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryList = await getCategorysService();
    return res.status(OK).json(categoryList);
  } catch (error) {
    next(error);
  }
};

export default getCategorys;
