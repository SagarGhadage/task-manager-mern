const express = require("express");
const { taskController } = require("../../controllers");
const validate = require("../../middlewares/validate");
const { taskValidation } = require("../../validations");
const auth = require("../../middlewares/auth");
const { upload } = require("../../controllers/task.controller");

const router = express.Router();

router.get("/", auth, taskController.getTasks);
router.get("/export", auth, taskController.exportTasks);
router.post("/import", auth,upload, taskController.importTasks);

router.get(
  "/:taskId",
  auth,
  validate(taskValidation.getTask),
  taskController.getTaskById
);

router.post(
  "/",
  auth,
  validate(taskValidation.createTask),
  taskController.createTask
);

router.put(
  "/:taskId",
  auth,
  validate(taskValidation.updateTask),
  taskController.updateTask
);

router.delete(
  "/:taskId",
  auth,
  validate(taskValidation.deleteTask),
  taskController.deleteTask
);

module.exports = router;
