import express from "express";
import { getMail } from "../controllers/searchController.js";

const router = express.Router();

router.get("/customer-email", getMail);

export default router;