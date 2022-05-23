require('dotenv').config();
const express = require('express');
const cors = require('cors');
const formidableMiddleware = require('express-formidable');
const mysql = require('mysql2/promise');
const crypto = require('crypto');
const { registerRoutes } = require('./route');

global.mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0,
});

const app = express();
app.use(cors());
app.use(formidableMiddleware());

registerRoutes(app);

app.listen(parseInt(process.env.PORT_NUMBER), () => {
    console.log(`Server running on port: ${process.env.PORT_NUMBER}`);
});