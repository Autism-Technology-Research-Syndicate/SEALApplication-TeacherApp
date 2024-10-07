require('dotenv').config();
const express = require('express');
const app = express();

const appRouter = require('./routes/route');



app.use(express.json());

app.use("/api/teachers/", appRouter);


module.exports = app;