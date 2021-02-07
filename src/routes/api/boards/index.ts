import { Router } from "express";
import { validateErrorHandler } from "@utils/errorHandler";
import * as controllers from "./controllers";
import * as middlewares from "@routes/middlewares";
import * as validators from "./validators";

const router = Router();

router.post(
  "/",
  middlewares.checkSpecialSymbols({ method: "body", key: "category" }),
  validators.createBoard,
  validateErrorHandler,
  controllers.createBoards,
);

router.get(
  "/:category/:id",
  validators.getBoardById,
  middlewares.checkSpecialSymbols({ method: "params", key: "category" }),
  validateErrorHandler,
  controllers.getBoardById,
);

router.get("/", validators.getBoards, validateErrorHandler, controllers.getBoards);

export default router;
