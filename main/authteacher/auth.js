const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');
const authenticateToken  = require('../middleware/authMid');
require('dotenv').config();

// Register a new teacher account
const registerTeacher = async (req, res) => {
    const { email, password, confirmPassword, name, phone } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json(
            { message: 'Passwords do not match' }
        );
    }

    try {
        const [existingTeacher] = await db.query('SELECT * FROM Teacher WHERE teacher_email = ?', [email]);
        if (existingTeacher && existingTeacher.length > 0) {
            return res.status(400).json(
                { message: 'Email is already registered' }
            );
        }

        const secretPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            'INSERT INTO Teacher (teacher_email, teacher_password, teacher_name, phone) VALUES (?, ?, ?, ?)',
            [email, secretPassword, name, phone]
        );

        res.status(200).json(
            { "message": "Teacher registered successfully"});
    } catch (error) {
        res.status(500).json(
            { message: error.message }
        );
    }
};

// Log in a teacher account
const loginTeacher = async (req, res) => {
    const {email, password} = req.body;

    try {
        const[checkingteacher] = await db.query('SELECT * FROM Teacher WHERE teacher_email = ?', [email]);
        if (checkingteacher.length == 0){
            return res.status(400).json(
                { message: 'This account does not exist' }
            );

        }

        const teacher = checkingteacher[0];

        console.log('Stored Hash:', teacher.teacher_password);
        const compare_pwd = await bcrypt.compare(password, teacher.teacher_password);
        console.log('Password Comparison Result:', compare_pwd);

        if (!compare_pwd){
            return res.status(400).json(
                {message: 'The passowrd is incorrect' }
            )
        }

        const token = jwt.sign(
            {id: teacher.id, email: teacher.teacher_email},
            process.env.JWT_SECRET,
            {expiresIn: '30mins'}

        );

        res.status(200).json(
            {message: 'Login successfully', token}
        );

    } catch(error){
        return res.status(500).json(
            { message: error.message }
        )

    }


}


// Update teacher information
const updateTeacher = async(req, res) => {

    const {name, password, cnfirm_password, phone} = req.body;
    const teacherId = req.user.id;

    try {
        // check password
        if (password) {
            if (cnfirm_password != password){
                return res.status(400).json(
                    {message: "Passwords do not match"}
                )
            }

            const new_pwd = await bcrypt.hash(password, 10);

            //update password
            await db.query(
                'UPDATE Teacher SET teacher_password = ? WHERE id = ?',
                [new_pwd, teacherId]
            );
        }
        // change name
        if (name) {
            await db.query(
                'UPDATE Teacher SET teacher_name = ? WHERE id = ?',
                [name, teacherId]
            );
        }
        // change phone
        if (phone) {
            await db.query(
                'UPDATE Teacher SET phone = ? WHERE id = ?',
                [phone, teacherId]
            );
        }

        res.status(200).json(
            {message: 'Information updated successfully'}
        )


    } catch(error){
        res.status(500).json(
            {message: error.message}
        );

    };



}




module.exports = { registerTeacher, loginTeacher, updateTeacher};
