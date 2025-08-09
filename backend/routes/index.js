import express from "express";
import authRoutes from "./authRoutes.js";
import searchRoutes from "./searchRoutes.js";
import userRoutes from "./userRoutes.js";
import orderRoutes from "./orderRoutes.js"
import recycleRoutes from "./recycleRoutes.js";
import calculateRoutes from "./calculateRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/search", searchRoutes);
router.use("/user", userRoutes);
router.use("/orders", orderRoutes);
router.use("/recyclables", recycleRoutes);
router.use("/calculate", calculateRoutes);

export default router;