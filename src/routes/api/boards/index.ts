import { Router } from "express";
import { validateErrorHandler } from "@utils/errorHandler";
import * as controllers from "./controllers";
import * as middlewares from "@routes/middlewares";
import * as validators from "./validators";

const router = Router();

// 게시글 추가
router.post(
  "/",
  middlewares.checkSpecialSymbols({ method: "body", key: "category" }),
  validators.createBoard,
  validateErrorHandler,
  controllers.createBoards,
);

// 전체 게시글 불러오기
router.get("/", validators.getBoards, validateErrorHandler, controllers.getBoards);

// 카테고리 게시글 리스트 불러오기
router.get(
  "/:category",
  validators.getCategoryBoards,
  middlewares.checkSpecialSymbols({ method: "params", key: "category" }),
  validateErrorHandler,
  controllers.getCategoryBoards,
);

// 카테고리에 속한 게시글 불러오기
router.get(
  "/:category/:id",
  validators.getBoardById,
  middlewares.checkSpecialSymbols({ method: "params", key: "category" }),
  validateErrorHandler,
  controllers.getBoardById,
);

export default router;
