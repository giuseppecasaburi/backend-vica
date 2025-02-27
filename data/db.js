import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// CONNESSIONE AL DATABASE
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

// CONNESSIONE AL DATABASE
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connesso al database");
    };
});

export default db;