require('dotenv').config();
const express = require('express');
const app = express();

const authRouter = require('./routes/route');
const courseRouter = require('./routes/courseRoute');
const roomRouter = require('./routes/roomRoute');



app.use(express.json());

app.use("/api/teachers/", authRouter);
app.use("/api/courses/", courseRouter);
app.use("/api/rooms/", roomRouter);



module.exports = app;