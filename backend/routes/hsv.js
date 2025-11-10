import express from "express";
import { getListClass,getListStudents,postConfirmAssessment } from '../controllers/hsvController.js';
const router = express.Router();

router.get('/classes', getListClass);
router.get('/class-students',getListStudents);
router.post('/confirm',postConfirmAssessment);

export default router;