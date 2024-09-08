const express = require('express');

const { registerTeacher, loginTeacher, updateTeacher} = require('../authteacher/auth');
const { authenticateToken, authorizeUser } = require('../middleware/authMid');
const { createCourse, searchCourse, updateCourse, deleteCourse} = require('../courses/course');
const { createRoom, searchRoom, updateRoom, deleteRoom} = require('../rooms/room')


const router = express.Router();
router.post("/register", registerTeacher);
router.post("/login", loginTeacher);
router.put("/update", authenticateToken, updateTeacher);



router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

router.get('/user/:userId', authenticateToken, authorizeUser, (req, res) => {
    res.json({ message: 'User data', user: req.user });
});


// // Teacher Router
// const teacherRouter = express.Router();
// teacherRouter.post("/register", registerTeacher);
// teacherRouter.post("/login", loginTeacher);
// teacherRouter.put("/update", authenticateToken, updateTeacher);
// //Course Router
// const courseRouter = express.Router();
// courseRouter.post("/insert", authenticateToken, createCourse);
// courseRouter.get("/search", authenticateToken, searchCourse);
// courseRouter.put("/update/:courseId", authenticateToken, updateCourse);
// courseRouter.delete("/delete/:courseId", authenticateToken, deleteCourse);
// //Room Router
// const roomRouter = express.Router();
// roomRouter.post("/insert", authenticateToken, createRoom);
// roomRouter.get("/search", authenticateToken, searchRoom);
// roomRouter.put("/update/:roomId", authenticateToken, updateRoom);
// roomRouter.delete("/delete/:roomId", authenticateToken, deleteRoom);


// teacherRouter.get('/profile', authenticateToken, (req, res) => {
//     res.json({ message: 'This is a protected route', user: req.user });
// });

// teacherRouter.get('/user/:userId', authenticateToken, authorizeUser, (req, res) => {
//     res.json({ message: 'User data', user: req.user });
// });




module.exports = router;
