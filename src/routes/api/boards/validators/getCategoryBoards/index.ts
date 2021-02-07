import { query } from "express-validator";

export default [
  query("page")
    .exists({ checkFalsy: true })
    .withMessage("page QS is not exists")
    .bail() // stop
    .isInt()
    .withMessage("page QS type must be integer type"),
];
