const express = require('express');
const facultyController = require('../controllers/facultyController');
const router = express.Router();

// /api/faculty/classes?username=...&term=...
router.get('/classes', facultyController.getClasses);

// Thêm route lấy students cho khoa (có thể cần quyền)
 router.get('/class/students', facultyController.getClassStudents);

module.exports = router;