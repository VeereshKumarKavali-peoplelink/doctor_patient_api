const jwt = require('jsonwebtoken');
const { failure } = require("../utils/response");
const errors = require("../utils/error.js");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return failure("UNAUTHORIZED", { status: false, error: errors.UNAUTHORIZED}, res);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return failure("UNAUTHORIZED", { status: false, error: errors.TOKN_INVLD}, res);
    }
};

const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return failure("ACCESS_FORBIDN", { status: false, error: errors.ACCESS_FORBIDN}, res);
  }
  next();
};

module.exports = {authMiddleware, authorize};

