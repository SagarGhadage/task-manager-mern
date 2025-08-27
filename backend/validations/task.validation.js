const Joi = require("joi");

const getTask = {
    params: Joi.object().keys({
      taskId:Joi.number(),
    }),
  };

const createTask = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    effortToComplete: Joi.number().integer().min(1).required(),
    dueDate: Joi.date().greater('now').required().messages({
      'date.greater': 'Due date must be a future date.',
    }),
  }),
};

const updateTask={
    params: Joi.object().keys({
      taskId:Joi.number(),
    }),
    body:Joi.object().keys({
      description:Joi.string(),
      title:Joi.string(),
      effortToComplete:Joi.number(),
      dueDate:Joi.date().greater('now'),
    }),
  }

const deleteTask = {
    params: Joi.object().keys({
      taskId:Joi.number(),
    }),
  };

module.exports = {
  getTask,deleteTask,createTask,updateTask
}