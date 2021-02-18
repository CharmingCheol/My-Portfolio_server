import { Router } from "express";
import boardsRouter from "@routes/api/boards";
import categorysRouter from "@routes/api/categorys";
import imagesRouter from "@routes/api/images";

const router = Router();

router.use("/boards", boardsRouter);
router.use("/categorys", categorysRouter);
router.use("/images", imagesRouter);

export default router;
