import express from "express";
import { getRecycleById, getRecycles } from "../controllers/recycleController.js";

const router = express.Router();

router.get("/all", getRecycles);
router.get("/:id", getRecycleById);

export default router;