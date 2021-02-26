import { NextFunction, Request, Response } from "express";
import { CREATED } from "http-status";
import { BoardsService, CategorysService } from "@services/index";
import replaceCategory from "@utils/replaceCategory";

const createBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.category = replaceCategory({ text: req.body.category });
    await CategorysService.increaseCategory({ category: req.body.category });
    const post = await BoardsService.createBoard({
      body: req.body.body,
      category: req.body.category,
      hashtag: req.body.hashtag,
      thumbnail: req.body.thumbnail,
      title: req.body.title,
    });
    return res.status(CREATED).json(post);
  } catch (error) {
    next(error);
  }
};

export default createBoard;
