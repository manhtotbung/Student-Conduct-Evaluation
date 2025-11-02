import express from "express";
import * as hsvController from '../controllers/hsvController.js';
const router = express.Router();

// /api/hsv/classes?username=...&term=...
router.get('/classes', hsvController.getClasses);
// /api/hsv/class-students?class_code=...&term=...
router.get('/class-students', hsvController.getClassStudents);
// /api/hsv/confirm
router.post('/confirm', hsvController.confirmAssessment);

export default router;