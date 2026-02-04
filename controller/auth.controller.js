const promisify = require("util").promisify;
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.modal");

const protect = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "You are not logged in! Please log in to get access.",
      });
    }

    const token = bearerToken.split(" ")[1];

    let decoded;
    try {
      decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Your session has expired. Please log in again." });
      }
      if (err.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ message: "Invalid token. Please log in again." });
      }
      throw err;
    }

    const currentUser = await UserModel.findById(decoded.id);

    if (!currentUser) {
      return res.status(401).json({
        message: "The user belonging to this token no longer exists.",
      });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong with the authentication process.",
      error: error.message,
    });
  }
};

module.exports = { protect };
