require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AWS = require("aws-sdk");
const connectMongoDB = require("./utils/mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 100000,
  }),
);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const indexRouter = require("./routes/index");

connectMongoDB();

app.use("/api", indexRouter);

app.use(function (req, res, next) {
  const err = new Error("404 Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res
    .status(err.status || 500)
    .send({ message: err.message || "500 Internal Server Error" });
});

module.exports = app;
