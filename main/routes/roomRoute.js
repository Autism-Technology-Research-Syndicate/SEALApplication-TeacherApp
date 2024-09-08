const express = require('express');

const { authenticateToken, authorizeUser } = require('../middleware/authMid');

const { createRoom, searchRoom, updateRoom, deleteRoom} = require('../rooms/room');

const router = express.Router();

router.post("/insert", authenticateToken, createRoom);
router.get("/search", authenticateToken, searchRoom);
router.put("/update/:roomId", authenticateToken, updateRoom);
router.delete("/delete/:roomId", authenticateToken, deleteRoom);

module.exports = router;