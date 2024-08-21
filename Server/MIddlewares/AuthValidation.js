const Joi = require("joi");

const signUpValidation = (req, res, next) => {
  //TO using Joi libary to set with the Validation require values
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),
    phoneNumber: Joi.string().min(10).max(20).required(),
  });

  //To check the Validate Schema
  const { error } = schema.validate(req.body);

  //If validation fails, return a 400 Bad Request
  if (error) {
    return res
      .status(400)
      .json({ message: "Bad Request", error: error.details });
  }

  next(); // Proceed to the next middleware or route handler
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  //If validation fails, return a 400 Bad Request
  if (error) {
    return res
      .status(400)
      .json({ message: "Bad Request", error: error.details });
  }

  next(); // Proceed to the next middleware or route handler
};

module.exports = { signUpValidation, loginValidation };
