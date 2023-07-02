const uniqid = require("uniqid");
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports.REGISTER = async (req, res) => {
  try {
    const name = req.body.name;
    const capitalizedFirstName = name.charAt(0).toUpperCase() + name.slice(1);

    if (!req.body.email.includes("@")) {
      return res.status(400).json({ response: "Invalid email format" });
    }

    const password = req.body.password;

    if (password.length < 6 || !/\d/.test(password)) {
      return res.status(400).json({
        response: "Password should be at least 6 characters long and contain at least one number",
      });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const user = new UserModel({
          id: uniqid(),
          name: capitalizedFirstName,
          email: req.body.email,
          password: hash,
        });

        await user.save();

        res.status(200).json({
          response: "User was saved successfully",
        });
      });
    });
  } catch (err) {
    res.status(400).json({ response: "Validation was not successful" });
  }
};

module.exports.LOGIN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ response: "Bad email or password" });
    }

    bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
      if (isPasswordMatch) {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user.id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "10d" },
          {
            algorithm: "RS256",
          }
        );

        return res.status(200).json({
          response: "You logged in successfully",
          jwt: token,
          userId: user.id
        });
      } else {
        return res.status(404).json({ response: "Bad email or password" });
      }
    });
  } catch (err) {
    console.log("ERR", err);
    res.status(404).json({ response: "ERROR, please try later" });
  }
};

