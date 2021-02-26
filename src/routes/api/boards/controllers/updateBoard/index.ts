import { Request, Response, NextFunction } from "express";
import { NOT_FOUND, CREATED } from "http-status";
import { BoardsService, CategorysService } from "@services/index";
import { NOT_FOUND_CATEGORY } from "@utils/const";
import replaceCategory from "@utils/replaceCategory";

const updateBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.category = replaceCategory({ text: req.body.category });
    const decreased = await CategorysService.decreaseCategory({ category: req.body.category });
    if (decreased === NOT_FOUND_CATEGORY) return res.status(NOT_FOUND).json({ message: NOT_FOUND_CATEGORY });
    await CategorysService.increaseCategory({ category: req.body.category });
    const updatedBoard = await BoardsService.updateBoard({
      body: req.body.body,
      category: req.body.category,
      hashtag: req.body.hashtag,
      id: req.params.id,
      thumbnail: req.body.thumbnail,
      title: req.body.title,
    });
    return res.status(CREATED).json(updatedBoard);
  } catch (error) {
    next(error);
  }
};

export default updateBoard;
