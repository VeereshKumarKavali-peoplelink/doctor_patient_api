const Joi = require("joi");
const { failure } = require("../utils/response");


//Middleware to validate user data
const validateUser = (request, response, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
      }),
  }).options({ stripUnknown: true });

  const { error } = schema.validate(request.body);
  if (error) {
    return failure("BAD_REQUEST", { status: false, error: error.details[0].message }, response)
  }
  next();
};



const validateDoctor = (request, response, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(18)
      .required()
      .messages({
        "string.empty": "Doctor name is required",
        "string.min": "Doctor name must be at least 2 characters",
        "string.max": "Doctor name must be less than 18 characters",
      }),

    experienceInYears: Joi.number()
      .integer()
      .min(0)
      .max(40)
      .required()
      .messages({
        "number.base": "Experience must be a number",
        "number.min": "Experience cannot be negative",
      }),

    phoneNumber: Joi.string()
      .pattern(/^[6-9]\d{9}$/) // Indian mobile format
      .required()
      .messages({
        "string.pattern.base": "Invalid phone number",
        "string.empty": "Phone number is required",
      }),

    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
      }),
  }).options({ stripUnknown: true });

  const { error } = schema.validate(request.body, { abortEarly: true });

  if (error) {
    return failure("BAD_REQUEST", { status: false, error: error.details[0].message }, response)
  }
  next();
}



const validatePatient = (request, response, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(18)
      .required()
      .messages({
        "string.empty": "Patient name is required",
        "string.min": "Patient name must be at least 2 characters",
        "string.max": "Doctor name must be less than 18 characters",
      }),

    age: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .required()
      .messages({
        "number.base": "Age must be a number",
        "number.min": "Age cannot be negative",
        "number.max": "Age cannot be greater than 100",
      }),

    gender: Joi.string()
      .valid("male", "female", "other")
      .required()
      .messages({
        "any.only": "Gender must be male, female, or other",
      }),

    weightInKgs: Joi.number()
      .min(1)
      .max(300)
      .required()
      .messages({
        "number.base": "Weight must be a number",
      }),

    healthIssue: Joi.string()
      .min(3)
      .max(200)
      .required()
      .messages({
        "string.empty": "Health issue is required",
      }),

    phoneNumber: Joi.string()
      .pattern(/^[6-9]\d{9}$/)
      .required()
      .messages({
        "string.pattern.base": "Invalid phone number",
        "string.empty": "Phone number is required",
      }),
  }).options({ stripUnknown: true });

  const { error } = schema.validate(request.body, { abortEarly: true });

  if (error) {
    return failure("BAD_REQUEST", { status: false, error: error.details[0].message }, response)
  }
  next();
}



module.exports = { validateUser, validateDoctor, validatePatient };
