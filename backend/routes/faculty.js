import express from "express";
import * as facultyController from '../controllers/facultyController.js';
const router = express.Router();

// /api/faculty/classes?username=...&term=...
router.get('/classes', facultyController.getClasses);

// Thêm route lấy students cho khoa (có thể cần quyền)
router.get('/class/students', facultyController.getClassStudents);

// Khoa chỉnh sửa điểm sinh viên
router.post('/student/update-score', facultyController.updateStudentScore);

// Khoa duyệt lớp
router.post('/class/approve', facultyController.approveClass);

export default router;