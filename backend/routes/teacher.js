const express = require('express');
const teacherController = require('../controllers/teacherController');
const router = express.Router();

// /api/teacher/students?username=...&term=...
router.get('/students', teacherController.getStudents);

module.exports = router;