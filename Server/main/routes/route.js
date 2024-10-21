const express = require('express');
const { registerTeacher, loginTeacher, updateTeacher } = require('../authteacher/auth'); // Import searchTeacher
const { authenticateToken, authorizeUser } = require('../middleware/authMid');
const { createCourse, searchCourse, updateCourse, deleteCourse } = require('../courses/course');
const { createRoom, searchRoom, updateRoom, deleteRoom } = require('../rooms/room');

const router = express.Router();

// Teacher routes
router.post("/register", registerTeacher);
router.post("/login", loginTeacher);
router.put("/update", authenticateToken, updateTeacher);

// Profile and user routes
router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

router.get('/user/:userId', authenticateToken, authorizeUser, (req, res) => {
    res.json({ message: 'User data', user: req.user });
});

// Course routes
router.post("/insertCourse", authenticateToken, createCourse);
router.get("/searchCourse", authenticateToken, searchCourse);
router.put("/updateCourse/:courseId", authenticateToken, updateCourse);
router.delete("/deleteCourse/:courseId", authenticateToken, deleteCourse);

// Room routes
router.post("/insertRoom", authenticateToken, createRoom);
router.get("/searchRoom", authenticateToken, searchRoom);
router.put("/updateRoom/:roomId", authenticateToken, updateRoom);
router.delete("/deleteRoom/:roomId", authenticateToken, deleteRoom);

module.exports = router;
