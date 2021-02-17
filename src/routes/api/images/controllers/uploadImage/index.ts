import { Response, NextFunction } from "express";

const uploadImage = (req, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json(req.file.location);
  } catch (error) {
    next(error);
  }
};

export default uploadImage;
