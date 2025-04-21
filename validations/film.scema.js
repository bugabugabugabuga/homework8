const Joi = require("joi");


const filmSchema = Joi.object({
    title: Joi.string().min(4).required().messages({"any.required": "title is required",}),


  releaseYear: Joi.number().min(1900).max(2025).required().messages({"number.min": "year should be more than 1900", }),
  genre: Joi.string().min(1).required().messages({ "any.required": "Genre is required",}),
  description: Joi.string().min(30).max(1200).required().messages({ "any.required": "description is required",}),//damateba
  rating: Joi.number().min(0).max(10).required().messages({"any.required": "rating is required", }),//damateba
});

module.exports = filmSchema;
