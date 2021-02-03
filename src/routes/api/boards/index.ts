import { Router } from "express";
import * as controllers from "./controllers";
import * as validators from "./validators";

const router = Router();

router.post("/", validators.createBoard, controllers.createBoards);

export default router;
