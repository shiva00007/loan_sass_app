const { signup, login } = require("../Controllers/AuthController");
const {
  signUpValidation,
  loginValidation,
} = require("../MIddlewares/AuthValidation");

const router = require("express").Router();

router.post("/login", loginValidation, login);
router.post("/signup", signUpValidation, signup);

module.exports = router;
