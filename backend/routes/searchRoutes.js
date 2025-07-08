import express from "express";
import { getByMail, getByName } from "../controllers/searchController.js";

const router = express.Router();

router.get("/customer-mail", getByMail);
router.get("/customers", getByName);

export default router;