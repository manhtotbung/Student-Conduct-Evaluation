const express = require('express');
const termController = require('../controllers/termController');
const router = express.Router();

// GET /api/terms - Lấy danh sách tất cả học kỳ (cho dropdown)
router.get('/', termController.getAllTerms);
// GET /api/terms/:termCode/status  <-- Đường dẫn đúng
router.get('/:termCode/status', termController.getTermStatus);

module.exports = router;