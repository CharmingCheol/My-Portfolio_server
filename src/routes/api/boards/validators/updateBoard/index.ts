import { body, param } from "express-validator";
import { NOT_UNDERSTAND_ID } from "@utils/const";

export default [
  body("body")
    .exists({ checkFalsy: true })
    .withMessage("body is not exists")
    .bail() // stop
    .isString()
    .withMessage("body must be string type")
    .bail() // stop
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("body is not exists"),
  body("category")
    .exists({ checkFalsy: true })
    .withMessage("category is not exists")
    .bail() // stop
    .isString()
    .withMessage("category must be string type")
    .bail() // stop
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("category is not exists"),
  body("thumbnail")
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("thumbnail is not exists")
    .bail() // stop
    .isURL()
    .withMessage("thumbnail must be URL")
    .bail(), // stop
  body("hashtag")
    .isArray({ min: 1 })
    .withMessage("hashtag is required at least one")
    .bail() // stop
    .isArray({ max: 5 })
    .withMessage("no more than 5 hashtags")
    .bail() // stop
    .custom((hashtag) => {
      hashtag.forEach((value) => {
        if (typeof value !== "string") throw "hashtag must be string type";
      });
      return hashtag;
    }),
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("title is not exists")
    .bail() // stop
    .isString()
    .withMessage("title must be string type")
    .bail() // stop
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("title is not exists"),
  param("category").trim().exists({ checkFalsy: true }).withMessage("category is not exists"),
  param("id")
    .bail() // stop
    .isMongoId()
    .withMessage(NOT_UNDERSTAND_ID),
];
