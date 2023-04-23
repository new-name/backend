const Project = require("../../models/Project");
const User = require("../../models/User");

exports.getProjects = async (req, res, next) => {
  const { user_id: userId } = req.params;

  try {
    const user = await User.findById(userId);
    const projects = await Project.find({ createdBy: user.email });

    res.status(200).send({ result: "Success", projects });
  } catch (err) {
    next(err);
  }
};

exports.postProjects = async (req, res, next) => {
  const { allElements, thumbnail, projectId } = req.body;
  const { user_id: userId } = req.params;

  const textElements = [];
  const imageElements = [];
  const gifElements = [];
  const shapeElements = [];

  Object.values(allElements).forEach((element) => {
    switch (element.type) {
      case "Text":
        textElements.push(element);
        break;
      case "Image":
        imageElements.push(element);
        break;
      case "Gif":
        gifElements.push(element);
        break;
      case "Shape":
        shapeElements.push(element);
        break;
      default:
        console.log("Unknown element type:", element.type);
    }
  });

  try {
    const user = await User.findById(userId);

    const newProjectData = {
      createdBy: user.email,
      createdAt: Date.now(),
      texts: textElements,
      images: imageElements,
      shapes: shapeElements,
      gifs: gifElements,
      thumbnail,
    };

    if (!projectId) {
      await Project.create(newProjectData);
    }

    if (projectId) {
      await Project.findOneAndUpdate({ _id: projectId }, newProjectData);
    }

    res.status(201).send({ result: "Success" });
  } catch (err) {
    next(err);
  }
};
