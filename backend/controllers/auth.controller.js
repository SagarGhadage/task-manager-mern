const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");
const ApiError = require("../utils/ApiError");


const register = catchAsync(async (req, res) => {
  const user=await userService.createUser(req.body)
  // console.log(user)
  const tokens=await tokenService.generateAuthTokens(user)
  res.status(httpStatus.CREATED).send({user,tokens})
});


const login = catchAsync(async (req, res) => {
  // console.log(req.body)

  let user=await authService.loginUserWithEmailAndPassword(req.body.email,req.body.password)
  if(user){
    const tokens=await tokenService.generateAuthTokens(user)
    res.status(httpStatus.OK).send({user,tokens}) 
  }else{
    new ApiError(httpStatus.UNAUTHORIZED,'invalid credentials ')
  }
});

module.exports = {
  register,
  login,
};
