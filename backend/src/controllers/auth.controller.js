const httpStatus = require('http-status');
const catchAsync = require('#utils/catchAsync');
const { authService } = require('#services/auth.service');

// const register = catchAsync(async (req, res) => {
//   const user = await userService.createUser(req.body);
//   const tokens = await tokenService.generateAuthTokens(user);
//   res.status(httpStatus.CREATED).send({ user, tokens });
// });

module.exports = {};
