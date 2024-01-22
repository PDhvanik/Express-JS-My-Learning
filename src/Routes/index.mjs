import { Router } from "express";
import usersRouter from "./user.mjs";
import productsRouter from "./product.mjs";

const router = Router();

router.use(usersRouter);
router.use(productsRouter);

export default router;