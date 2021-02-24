import { Router } from "express";
import { validateErrorHandler } from "@utils/errorHandler";
import * as controllers from "./controllers";
import * as middlewares from "@routes/middlewares";
import * as validators from "./validators";

const router = Router();

// 게시글 추가
router.post(
  "/",
  validators.createBoard,
  validateErrorHandler,
  middlewares.checkSpecialSymbols({ method: "body", key: "category" }),
  controllers.createBoards,
);

// 게시글 수정
router.put(
  "/:category/:id",
  validators.updateBoard,
  validateErrorHandler,
  middlewares.checkSpecialSymbols({ method: "body", key: "category" }),
  middlewares.checkSpecialSymbols({ method: "params", key: "category" }),
  controllers.updateBoard,
);

// 전체 게시글 불러오기
router.get("/", validators.getBoards, validateErrorHandler, controllers.getBoards);

// 카테고리 게시글 리스트 불러오기
router.get(
  "/:category",
  validators.getCategoryBoards,
  validateErrorHandler,
  middlewares.checkSpecialSymbols({ method: "params", key: "category" }),
  controllers.getCategoryBoards,
);

// 카테고리 게시글 갯수 불러오기
router.get(
  "/count/:category",
  middlewares.checkSpecialSymbols({ method: "params", key: "category" }),
  controllers.getCategoryBoardsCount,
);

// 카테고리에 속한 게시글 불러오기
router.get(
  "/:category/:id",
  validators.getBoardById,
  validateErrorHandler,
  middlewares.checkSpecialSymbols({ method: "params", key: "category" }),
  controllers.getBoardById,
);

export default router;
