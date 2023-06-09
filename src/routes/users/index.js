const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.Controller");

router.get("/:user_id", userController.getProjects);
router.post("/:user_id/projects", userController.postProjects);
router.delete("/:user_id/projects/:projectId", userController.deleteProjects);

module.exports = router;
