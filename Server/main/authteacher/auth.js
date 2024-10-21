const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authMid');
require('dotenv').config();

// Register a new teacher account
const registerTeacher = async (req, res) => {
    const { email, password, confirmPassword, name, phone } = req.body;

    // Check if the passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if the teacher already exists
        const [existingTeacher] = await db.query('SELECT * FROM Teacher WHERE teacher_email = ?', [email]);
        if (existingTeacher && existingTeacher.length > 0) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password before storing it
        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10; // Get salt rounds from environment variable
        const secretPassword = await bcrypt.hash(password, saltRounds);
        
        // Insert the new teacher into the database
        await db.query(
            'INSERT INTO Teacher (teacher_email, teacher_password, teacher_name, phone) VALUES (?, ?, ?, ?)',
            [email, secretPassword, name, phone]
        );

        res.status(201).json({ message: "Teacher registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Log in a teacher account
const loginTeacher = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the teacher exists
        const [checkingteacher] = await db.query('SELECT * FROM Teacher WHERE teacher_email = ?', [email]);
        if (checkingteacher.length === 0) {
            return res.status(400).json({ message: 'This account does not exist' });
        }

        const teacher = checkingteacher[0];
        // Compare the provided password with the hashed password
        const compare_pwd = await bcrypt.compare(password, teacher.teacher_password);

        if (!compare_pwd) {
            return res.status(400).json({ message: 'The password is incorrect' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: teacher.id, email: teacher.teacher_email },
            process.env.JWT_SECRET,
            { expiresIn: '30m' } // Token will expire in 30 minutes
        );

        res.status(200).json({  message: 'Login successfully',checkingteacher, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update teacher information
const updateTeacher = async (req, res) => {
    const { name, password, confirm_password, phone } = req.body;
    const teacherId = req.user.id; // Get the teacher's ID from the authenticated user

    try {
        // Update password if provided
        if (password) {
            if (confirm_password !== password) {
                return res.status(400).json({ message: "Passwords do not match" });
            }

            const new_pwd = await bcrypt.hash(password, 10);
            await db.query('UPDATE Teacher SET teacher_password = ? WHERE id = ?', [new_pwd, teacherId]);
        }
        // Update name if provided
        if (name) {
            await db.query('UPDATE Teacher SET teacher_name = ? WHERE id = ?', [name, teacherId]);
        }
        // Update phone if provided
        if (phone) {
            await db.query('UPDATE Teacher SET phone = ? WHERE id = ?', [phone, teacherId]);
        }

        res.status(200).json({ message: 'Information updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { registerTeacher, loginTeacher, updateTeacher };
