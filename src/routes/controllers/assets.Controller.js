exports.getProjects = async (req, res, next) => {
  try {
    res.send({ result: "ok" });
  } catch (err) {
    next(err);
  }
};
