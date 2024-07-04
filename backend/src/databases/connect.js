import mysql from 'mysql2/promise';

const connectDB = mysql.createPool({
    host: process.env.EXPRESS_DATABASE_HOST_NAME,
    port: process.env.EXPRESS_DATABASE_HOST_PORT,
    user: process.env.EXPRESS_DATABASE_USER,
    password: process.env.EXPRESS_DATABASE_PASSWORD,
    database: process.env.EXPRESS_DATABASE_DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

export default connectDB;