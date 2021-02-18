import { Router } from "express";
import * as controllers from "./controllers";

const router = Router();

// 카테고리 리스트 불러오기
router.get("/", controllers.getCategorys);

export default router;
