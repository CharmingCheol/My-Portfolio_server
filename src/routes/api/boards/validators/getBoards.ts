import { query } from "express-validator";
import { WRONG_PAGE_TYPE } from "@utils/const";

export default [query("page").isNumeric().withMessage(WRONG_PAGE_TYPE).bail().isString().withMessage(WRONG_PAGE_TYPE)];
