import express from "express";
import { getByID, getByMail, getByName } from "../controllers/searchController.js";

const router = express.Router();

router.get("/customer-mail", getByMail);
router.get("/customers", getByName);
router.get("/customer-id", getByID);

export default router;