import express from "express";
import {getAllStudents, getAllStudentsInClassController, postAcceptStudent, getTeacherLockStatus} from "../controllers/teacherController.js";

const router = express.Router();

// /api/teacher/students?username=...&term=...
router.get('/students',getAllStudents);
router.get('/students/all',getAllStudentsInClassController);
router.post('/accept', postAcceptStudent);
router.get('/lock-status', getTeacherLockStatus);

export default router;