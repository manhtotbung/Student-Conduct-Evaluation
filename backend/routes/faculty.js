import express from "express";
import * as facultyController from '../controllers/facultyController.js';
const router = express.Router();

// /api/faculty/classes?username=...&term=...
router.get('/classes', facultyController.getClasses);

// Thêm route lấy students cho khoa (có thể cần quyền)
 router.get('/class/students', facultyController.getClassStudents);

export default router;