import express from "express";
import { calculateCO2 } from "../controllers/calculationsController.js";

const router = express.Router();

router.post("/co2", calculateCO2);

export default router;