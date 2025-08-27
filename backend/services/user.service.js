const { User } = require("../models");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const { where } = require("sequelize");

/**
 * Get User by id
 * @param {String} id
 * @returns {Promise<User>}
 */
getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    // console.log(user.dataValues,'user',id)
    return user.dataValues;
  } catch (e) {
    throw e;
  }
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } }); // Find user by email
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
  } catch (e) {
    throw e;
  }
};
/**
 * Create user
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "name": "users",
 *  "email": "user@gmail.com",
 *  "password": "usersPasswordHashed"
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */
createUser = async (userBody) => {
  try {
    const { name, email, password } = userBody;
    if (!email) {
      throw new ApiError(httpStatus.BAD_REQUEST, '""email" email is required!');
    }
    if (!password) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        '""password"" password is required!'
      );
    }

    if (await User.findOne({ where: { email } })) {
      // console.log(userBody)
      throw new ApiError(httpStatus.CONFLICT, '""email"" email already exist');
    } else {
      console.log(name, email, password);
      const hashedPassword = await bcrypt.hash(userBody.password, 10);
      return await User.create({ ...userBody, password: hashedPassword });
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = { getUserById, getUserByEmail, createUser };
