const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const isHashed = await bcrypt.compare(password, user.password);

    if (!user || !isHashed) {
      return res
        .status(400)
        .send({ message: "No user with that email or password" });
    }
    const token = jwt.sign({ email }, process.env.SECRET_KEY);

    res.status(201).send({ result: "Success", user, token });
  } catch (err) {
    next(err);
  }
};

exports.signout = async (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res.status(403).send({ message: "Unauthorized user" });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded) {
      res.status(204).send({ result: "Success" });
    }
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!user) {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
    }

    res.status(201).send({ result: "Success" });
  } catch (err) {
    next(err);
  }
};
