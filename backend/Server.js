import express from "express";
import mysql from "mysql2";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "TEA41",  // your password
  database: "hotel_db"
});

// Test API
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Fetch rooms
app.get("/rooms", (req, res) => {
  db.query("SELECT * FROM rooms", (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

