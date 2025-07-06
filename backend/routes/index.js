import express from "express";
import authRoutes from "./authRoutes.js";
import searchRoutes from "./searchRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/search", searchRoutes);
export default router;