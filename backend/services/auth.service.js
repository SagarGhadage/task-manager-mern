const httpStatus = require("http-status");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
/**
 * Login with username and password
 * - Utilize userService method to fetch user corresponding to the email provided
 * - If user doesn't exist or incorrect password,
 * throw  ApiError with "401 Unauthorized" status code and message, "Incorrect email or password"
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 * as it is aync
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  // console.log(email,password)
  if(!email) throw new ApiError(httpStatus.BAD_REQUEST,'email is required')
  if(!password) throw new ApiError(httpStatus.BAD_REQUEST,'password is required')

  let user=await userService.getUserByEmail(email)
  // console.log(user)
  
  if(user){
    // console.log('as=>',user)
    // console.log(password,user.password)
    if(await isPasswordMatch(password,user.password)){
      return user
    }
    throw new ApiError(httpStatus.UNAUTHORIZED,'Incorrect email or password')
  }
  throw new ApiError(httpStatus.UNAUTHORIZED,'Incorrect email or password')
};

const isPasswordMatch= async (password,hash) => {
  return await bcrypt.compare(password,hash);
};
module.exports = {
  loginUserWithEmailAndPassword,
};
