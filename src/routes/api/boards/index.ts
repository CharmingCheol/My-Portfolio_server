import { Router } from "express";
import * as controllers from "./controllers";
import * as validators from "./validators";

const router = Router();

router.post("/", validators.createBoard, controllers.createBoards);
router.get("/:id", validators.getBoardById, controllers.getBoardById);

export default router;
