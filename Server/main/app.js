require('dotenv').config();
const express = require('express');
const cors = require('cors'); // 引入 cors
const app = express();

const appRouter = require('./routes/route');

// 使用 cors 中间件，允许所有来源的跨域请求
app.use(cors({
    origin: 'http://localhost:3000', // Replace with the front-end domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow credentials (cookies, headers)
  }));

// 解析 JSON 请求体
app.use(express.json());

// 定义路由
app.use("/api/teachers/", appRouter);

module.exports = app;
