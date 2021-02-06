import { Router } from "express";
import { validateErrorHandler } from "@utils/errorHandler";
import * as controllers from "./controllers";
import * as validators from "./validators";

const router = Router();

router.post("/", validators.createBoard, validateErrorHandler, controllers.createBoards);
router.get("/:id", validators.getBoardById, validateErrorHandler, controllers.getBoardById);
router.get("/", validators.getBoards, validateErrorHandler, controllers.getBoards);

export default router;
