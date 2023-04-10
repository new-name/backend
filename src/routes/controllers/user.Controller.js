const Image = require("../../models/Image");

exports.getProjects = async (req, res, next) => {
  const { email } = req.body;

  try {
    const projects = Image.find({ createdBy: email });

    res.status(200).send({ result: "Success", projects });
  } catch (err) {
    next(err);
  }
};
