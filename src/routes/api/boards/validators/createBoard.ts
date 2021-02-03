import { body } from "express-validator";

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
];
