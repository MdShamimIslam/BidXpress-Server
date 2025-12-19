import express from "express";
import { createFeedback, getFeedbacks } from "../controllers/feedbackCtr.js";
import { protect } from "../middlewares/authMiddleWare.js";
const router = express.Router();

router.post("/", protect, createFeedback); 
router.get("/", protect, getFeedbacks); 

export default router;