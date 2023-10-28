const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: Token missing" });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).json({ message: "Forbidden: Token invalid" });
    }
    req.user = user;
    next();
  });
}

// authenticate user with JWT token
app.get("/authenticate", authenticateToken, (req, res) => {
  res.json({ message: "Authenticated", user: req.user });
});

// Login endpoint (returns a JWT token)
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { username },
  });
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!user || !passwordMatch) {
    res.status(401).json({ message: "Authentication failed" });
  } else {
    // Generate a JWT token
    const token = jwt.sign({ username }, process.env.JWT_KEY, {
      expiresIn: "10h",
    });
    const id = user.id;
    // Return the token to the client
    res.json({ token, id });
  }
});

// Signup endpoint (stores user in the database)
app.post("/signup", async (req, res) => {
  // Implement user registration logic
  const { username, password } = req.body;

  try {
    // Hash the user's password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    res.json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error hashing password: " + error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Logout endpoint
app.post("/logout", authenticateToken, (req, res) => {
  res.json({ message: "Logout successful" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
