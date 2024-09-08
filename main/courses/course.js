const db = require('../db');

// Create a new Course
const createCourse = async (req, res) => {
    const {courseName} = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Course (course_name) VALUES (?)',
            [courseName]
        );

        res.status(201).json(
            {courseId:result.insertId, courseName}
        );

    } catch(error){
        res.status(500).json(
            {message: error.message }
        );

    };

}

// Search all Courses
const searchCourse = async (req, res) => {
    try {
        const [row] = await db.query('SELECT * FROM Course');
        res.json(row);

    } catch(error){
        res.status(500).json(
            {message: error.message }
        );

    };

}


// Update a course
const updateCourse = async (req, res) => {
    try {

        const {courseName} = req.body;
        const {courseId} = req.params;

        const [change]  = await db.query(
            'UPDATE Course SET course_name = ? WHERE course_id = ? ',
            [courseName, courseId]
        );

        if (change.affectedRows == 0) {
            return res.status(404).json({ message: 'class not found' });
        }

        res.status(200).json(
            {message: 'course has been updated successfully', courseName}
        )


    } catch(error){
        res.status(500).json(
            {messgae: error.message }
        );

    };

}
// Delet a course

const deleteCourse = async (req, res) => {

    const {courseId} = req.params;


    try{
        const [result] = await db.query('DELETE FROM Course WHERE course_id = ? ', [courseId]);
        if (result.affectedRows === 0) {
            // No rows were affected, which means the course_id did not exist
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course has been deleted successfully' });

    }catch{
        res.status(500).json(
            {messgae: error.message }
        );

    };

}


module.exports = {createCourse, searchCourse, updateCourse, deleteCourse}