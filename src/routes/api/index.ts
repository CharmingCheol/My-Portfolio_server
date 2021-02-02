import { Router } from "express";
import boardsRouter from "@routes/api/boards";

const router = Router();

router.use("/boards", boardsRouter);

export default router;
