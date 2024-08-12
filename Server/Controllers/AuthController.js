const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user");

const signup = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, you can login.",
        success: false,
      });
    }
    const userModel = new UserModel({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      phoneNumber,
    });
    await userModel.save();
    res.status(201).json({
      message: "Signup successful.",
      success: true,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Authentication failed: email or password is incorrect.";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful.",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
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