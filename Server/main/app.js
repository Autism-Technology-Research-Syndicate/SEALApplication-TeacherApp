require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors'); 

const authRouter = require('./routes/route');
const courseRouter = require('./routes/courseRoute');
const roomRouter = require('./routes/roomRoute');

app.use(cors({
    origin: 'http://localhost:3000', // Replace with the front-end domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow credentials (cookies, headers)
  }));

app.use(express.json());

app.use("/api/teachers/", authRouter);
app.use("/api/courses/", courseRouter);
app.use("/api/rooms/", roomRouter);



module.exports = app;