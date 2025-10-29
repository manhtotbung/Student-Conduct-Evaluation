import express from "express";
import {getCriteriaController,getSelfAssessment,saveSelfAssessment,getStudentHistory,} from "../controllers/drlController.js";

const router = express.Router();

router.get("/criteria", getCriteriaController);
router.get("/self", getSelfAssessment);
router.post("/self", saveSelfAssessment);
router.get("/history", getStudentHistory);

export default router;
