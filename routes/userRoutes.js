const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password,role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword,role });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error",error)
    res.status(500).json({ message: "Server Error" });
  }
});

// Register multiple users
router.post("/multipleRegisters", async (req, res) => {
  const users = req.body;  // Expecting an array of user objects
  try {
    for (let userData of users) {
      const { name, email, password, role } = userData;

      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: `User with email ${email} already exists` });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = new User({ name, email, password: hashedPassword, role });

      // Save user
      await user.save();
    }
    res.status(201).json({ message: "Users registered successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET route to fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();  // This retrieves all users from the database
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


module.exports = router;
