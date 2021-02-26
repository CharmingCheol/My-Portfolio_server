import { param } from "express-validator";
import { NOT_UNDERSTAND_ID } from "@utils/const";

export default [param("id").isMongoId().withMessage(NOT_UNDERSTAND_ID)];
