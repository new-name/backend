const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
  try {
    res.send({ result: "ok" });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ uid });

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ password }, process.env.SECRET_KEY);

    if (!user) {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
    }

    res.status(201).send({ result: "Success", token });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.send({ result: "ok" });
  } catch (err) {
    next(err);
  }
};
