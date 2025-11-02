import express from "express";
import {getStudents} from "../controllers/teacherController.js";

const router = express.Router();

// /api/teacher/students?username=...&term=...
router.get('/students',getStudents);

export default router;