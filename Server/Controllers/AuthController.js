// Import necessary modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user");

const signup = async (req, res) => {
  try {
    // Extract user details from request body
    const { name, email, password, phoneNumber } = req.body;

    // Check if a user with the given email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email. Please log in instead.",
        success: false,
      });
    }

    // Create a new user with a hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({
      message: "Signup successful.",
      success: true,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

// Login controller function
const login = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Define an error message for failed authentication
    const errorMsg = "Authentication failed: email or password is incorrect.";

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // Generate JWT token valid for 24 hours
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" } // Token expiration time
    );

    // Respond with a success message and the token
    res.status(200).json({
      message: "Login successful.",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
