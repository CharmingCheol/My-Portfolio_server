import { Router } from "express";
import * as controllers from "./controllers";

const router = Router();

router.post("/", controllers.createBoards);

export default router;
