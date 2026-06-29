import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { authMiddleware } from "./middlewares/authMiddleware.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5174");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Creating database pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT,
}).promise();

// Main
app.get("/", (req, res) => {
  res.send("Hello World!");
})

// Register
app.post("/register", async (req, res) => {
  const { name, email, password, birthDate } = req.body;
  
  if (!name || !email || !password) {
    res.status(400).json({error: "name, email, and password are required."})
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const [rows] = await pool.query("INSERT INTO users (name, email, password, birth_date) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, birthDate]);

  res.json({message: "User registered successfully", userID: rows.insertId});
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({error: "email and password are required."})
    return
  }

  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

  if (rows.length === 0) {
    res.status(401).json({error: "Invalid email or password."});
    return;
  }

  const user = rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401).json({error: "Invalid email or password."});
    return;
  }

  const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: "7d" });

  res.json({ message: "Login successful", token });
});

// Reset Password
app.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    res.status(400).json({error: "email and newPassword are required."})
    return
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  const [result] = await pool.query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email]);

  if (result.affectedRows === 0) {
    res.status(404).json({error: "User not found."});
    return;
  }

  res.json({ message: "Password reset successful" });
});

// Get Users (Protected Route)

app.get("/users", authMiddleware, async (req, res) => {
  const [rows] = await pool.query("SELECT id, name, email, birth_date FROM users");
  res.json(rows);
});

// Logout
app.post("/logout", (req, res) => {
  res.json({ message: "Logout successful" });
});


// Server Run
const port = 3931;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});