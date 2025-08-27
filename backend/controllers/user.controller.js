const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { userService } = require("../services");
const config = require("../config/config");
/**
 * Get user details
 * @returns {User}
 */
const getUser = catchAsync(async (req, res) => {
  let { userId } = req.params;
  // console.log("uc=>", req.params);
  // console.log("uc=>getUser>:", userId);
  if (req.headers.authorization.split(" ")[0] === "Bearer") {
    console.log("checking");
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwt.secret,
      {},
      async (err, payload) => {
        // console.log(payload);
        // let loggedInUser = await userService.getUserById(payload.sub);
        // console.log(loggedInUser);

        if (userId === payload.sub) {
          const user = await userService.getUserById(userId);
          // console.log(user);
          res.status(200).json(user);
        } else {
          res.status(403).json("Not authorized");
        }
      }
    );
  }
});

module.exports = {
  getUser,
};
