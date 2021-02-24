import { Request, Response, NextFunction } from "express";
import { NOT_FOUND, CREATED } from "http-status";
import { updateBoardService } from "@services/boards";
import { createCategoryService, decreaseCategoryService } from "@services/categorys";
import { NOT_FOUND_CATEGORY, NOT_FOUND_ID } from "@utils/const";
import replaceCategory from "@utils/replaceCategory";

const updateBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.category = replaceCategory({ text: req.body.category });
    const decreased = await decreaseCategoryService({ category: req.body.category });
    if (decreased === NOT_FOUND_CATEGORY) return res.status(NOT_FOUND).json({ message: NOT_FOUND_CATEGORY });
    await createCategoryService({ category: req.body.category });
    const updatedBoard = await updateBoardService({
      body: req.body.body,
      category: req.body.category,
      hashtag: req.body.hashtag,
      id: req.params.id,
      thumbnail: req.body.thumbnail,
      title: req.body.title,
    });
    if (updatedBoard === NOT_FOUND_ID) return res.status(NOT_FOUND).json({ message: NOT_FOUND_ID });
    return res.status(CREATED).json(updatedBoard);
  } catch (error) {
    next(error);
  }
};

export default updateBoard;
