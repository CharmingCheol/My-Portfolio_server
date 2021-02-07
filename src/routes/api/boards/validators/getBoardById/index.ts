import { param } from "express-validator";
import { NOT_UNDERSTAND_ID } from "@utils/const";

export default [
  param("category").trim().exists({ checkFalsy: true }).withMessage("category is not exists"),
  param("id")
    .bail() // stop
    .isMongoId()
    .withMessage(NOT_UNDERSTAND_ID),
];
