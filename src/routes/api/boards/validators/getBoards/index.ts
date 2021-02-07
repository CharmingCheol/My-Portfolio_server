import { query } from "express-validator";
import { WRONG_PAGE_TYPE } from "@utils/const";

export default [
  query("page")
    .exists({ checkFalsy: true })
    .withMessage("page QS is not exists")
    .bail() // stop
    .isInt()
    .withMessage(WRONG_PAGE_TYPE),
];
