const Joi = require("joi");

const directorSchema = Joi.object({
  fullname: Joi.string().min(4).required().messages({"any.required": "Fullname is required"}),
  age: Joi.number().min(1).max(99).optional().messages({"number.base": "Age must be a number"}),
  films: Joi.array().items(Joi.string().hex().length(24)).optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  middlename: Joi.string().optional().min(2).max(30)
   
});

module.exports = directorSchema;
