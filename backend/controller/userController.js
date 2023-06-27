const asyncHandler = require("express-async-handler");
const User = require("../model/User");

// @desc    Register User
// @route   POST /api/user/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, password, role } = req.body;
    console.log(req.body);

    let checkUser = await User.findOne({ username: username });
    if (checkUser) {
        res.status(409);
        throw new Error("Username is not valid");
    }

    const newUser = await User.create({
        username: username,
        password: password,
        role: role,
    });

    if (newUser) {
        res.status(200).json(newUser);
    } else {
        res.status(401);
        throw new Error("Unsucessfull");
    }
});

// @desc    Login user
// @route   POST api/user/login
// @access  public
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const loginUser = await User.findOne({
        username: username,
        password: password,
    });

    if (loginUser) {
        res.status(200).json(loginUser);
    } else {
        res.status(401);
        throw new Error("Invalid Username or Password");
    }
});

module.exports = {
    registerUser,
    loginUser,
};
