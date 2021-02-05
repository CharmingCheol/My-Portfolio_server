import { Router } from "express";
import { createProduct, getProduct, getProductById } from "./controller";

const router = Router();

router.post("/products", createProduct);
router.get("/products", getProduct);
router.get("/products/:productId", getProductById);

export default router;
