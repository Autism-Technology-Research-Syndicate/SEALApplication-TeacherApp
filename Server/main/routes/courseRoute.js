const express = require('express');

const { authenticateToken, authorizeUser } = require('../middleware/authMid');
const { createCourse, searchCourse, updateCourse, deleteCourse} = require('../courses/course');

const router = express.Router();

router.post("/insert", authenticateToken, createCourse);
router.get("/search", authenticateToken, searchCourse);
router.put("/update/:courseId", authenticateToken, updateCourse);
router.delete("/delete/:courseId", authenticateToken, deleteCourse);

module.exports = router;