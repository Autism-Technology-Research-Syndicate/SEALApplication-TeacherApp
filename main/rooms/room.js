const { TokenExpiredError } = require('jsonwebtoken');
const db = require('../db');
const findAvailablePort= require('../utils/port');
const generateQrcode = require('../utils/qrCode');

// Create a classroom

const createRoom = async (req, res) => {

    const {courseId, teacherId, startTime, endTime, capacity} = req.body;
    try {
        // Find an available port;

        const port = await findAvailablePort(8081);

         // create a room;
        const [result] = await db.query(
            'INSERT INTO Room (course_id, teacher_id, start_time, end_time, capacity) VALUES (?, ?, ?, ?, ?)',
            [courseId, teacherId, startTime, endTime, capacity]
        );

        // Generate QR code with port information
        const qrCodeDataURL = await generateQrcode(port);

       
        res.status(201).json(
            {roomId: result.insertId,
            courseId, 
            teacherId, 
            startTime, 
            endTime, 
            capacity,
            port,
            qrCodeDataURL}
        );

    } catch (error) {
        res.status(500).json(
            {message: error.message}
        );

    };

}
 
// Search all classrooms

const searchRoom = async (req, res) => {
    try {
        const [results] = await db.query(`
        SELECT
            Room.room_id, 
            Teacher.teacher_name, 
            Course.course_name,
            Room.start_time, 
            Room.end_time, 
            Room.capacity
        FROM Room 
        JOIN Teacher ON Room.teacher_id = Teacher.id 
        JOIN Course ON Room.course_id = Course.course_id
        `);
        res.status(200).json(results);

    }catch (error) {
        res.status(500).json(
            {message: error.message}
        )

    };
}



// Update a classroom

const updateRoom = async (req, res) => {
    const {courseId, teacherId, startTime, endTime, capacity} = req.body;
    const {roomId} = req.params;

    try {

        const [change] = await db.query(
            `UPDATE Room 
             SET 
                course_id = ?,
                teacher_id = ?,
                start_time = ?,
                end_time = ?,
                capacity = ?
            WHERE room_id = ?`,
            [courseId, teacherId, startTime, endTime, capacity, roomId]
        );

        if (change.affectedRows == 0){
            return res.status(404).json({ message: 'Room not found' });

        }

        res.status(200).json(
            {message: 'Classroom has been updated successfully' }
        )



    }catch(error){
        res.status(500).json(
            {message: error.message}
        )
    }
}

// Delete a classroom

const deleteRoom = async (req, res) => {
    const {roomId} = req.params;

    try{
        const [result] = await db.query(
            'DELETE FROM Room WHERE room_id = ?',
            [roomId]
        );

        if (result.affectedRows === 0) {
            // No rows were affected, which means the room_id did not exist
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(200).json({ message: 'Room has been deleted successfully' });


    }catch(error){
        res.status(500).json(
            {message: error.message}
        );
    }

}

module.exports = {createRoom, searchRoom, updateRoom, deleteRoom}