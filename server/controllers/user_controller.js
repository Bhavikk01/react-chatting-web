const User = require("../models/user_model.js");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const passwordValidation = await bcrypt.compare(password, user.password);
            console.log(password + `This is database password: ${passwordValidation}`);
            if (passwordValidation) {
                delete user.password;
                return res.json({ status: true, user: user });
            } else {
                return res.json({ msg: "Wrong Password", status: false })
            }
        } else {
            return res.json({ msg: "Please provide valid credentials", status: false })
        }
    } catch (error) {
        next(error);
    }
};

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ msg: "User already exist", status: false });
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: "Email already exist", status: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email: email,
            username: username,
            password: hashedPassword
        });
        delete user.password;
        return res.json({ status: true, user: user });
    } catch (error) {
        next(error);
    }
};

module.exports.getAllUser = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "_id"
        ]);
        console.log(users);
        return res.json(users);
    } catch (error) {
        next(error);
    }
};