const Joi = require("joi");

const getUser = {
  params: Joi.object().keys({
    userId:Joi.number(),
  }),
};

module.exports = {
  getUser,
};
