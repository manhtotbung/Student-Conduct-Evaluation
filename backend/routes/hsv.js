const express = require('express');
const hsvController = require('../controllers/hsvController');
const router = express.Router();

// /api/hsv/classes?username=...&term=...
router.get('/classes', hsvController.getClasses);
// /api/hsv/class-students?class_code=...&term=...
router.get('/class-students', hsvController.getClassStudents);
// /api/hsv/confirm
router.post('/confirm', hsvController.confirmAssessment);

module.exports = router;