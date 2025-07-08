import express from "express";
import { getOrderById, getOrders } from "../controllers/ordersController.js";

const router = express.Router();

router.get("/all", getOrders);
router.get("/:id", getOrderById);

export default router;