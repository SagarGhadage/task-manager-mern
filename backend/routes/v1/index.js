const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const taskRoute = require("./tasks.route");


const router = express.Router();


router.use("/user",userRoute)
router.use("/auth",authRoute)
router.use('/task',taskRoute)
module.exports = router;
