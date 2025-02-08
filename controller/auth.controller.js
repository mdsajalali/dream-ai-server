const promisify = require("util").promisify;
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.modal");

const protect = async (req, res, next) => {
  // 1) Getting token and check if it's there
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    return next(
      new Error("You are not logged in! Please log in to get access.")
    );
  }

  // 2) Extract the token from the "Bearer <token>" format
  const token = bearerToken.split(" ")[1]; // Get the token part after 'Bearer'

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);

  //   3) Check if user still exists
  const currentUser = await UserModel.findById(decoded.id);

  if (!currentUser) {
    return next(
      new Error("The user belonging to this token no longer exists.")
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};

module.exports = {
  protect,
};
