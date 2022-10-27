const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token);
    if (!token) {
        return next(new ErrorHandler("Please Login to access resources", 401))
    };

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedData)
    req.user = await User.findById(decodedData.id);
    console.log(req.user)

    console.log("isauthenticatedUser'a geldi")
    next();
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        console.log("authorizeRoles'a geldi")
        console.log(roles.includes(req.user.role))
        if (!roles.includes(req.user.role)) {

            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403))

        }

        next();

    }
}