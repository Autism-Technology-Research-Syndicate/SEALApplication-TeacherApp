const express = require('express');
const { registerTeacher, loginTeacher, updateTeacher} = require('../authteacher/auth');
const { authenticateToken, authorizeUser } = require('../middleware/authMid');
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


module.exports = router;
