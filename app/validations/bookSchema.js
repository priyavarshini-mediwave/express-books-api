const Joi = require("joi");

const bookSchema = Joi.object({
  title: Joi.string().required(),
  isbn: Joi.string().required(),
});

module.exports = {
  bookSchema,
};
