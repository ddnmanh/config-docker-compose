const mysql = require('mysql2');

const connectDB = mysql.createConnection({
    host: process.env.DB_HOST, // Tên của container MySQL
    port: process.env.DB_PORT,
    user: process.env.DB_USER,             // Người dùng MySQL
    password: process.env.DB_PASSWORD, // Mật khẩu MySQL
    database: process.env.DB_DATABASE  // Tên của database MySQL
});

module.exports = connectDB;