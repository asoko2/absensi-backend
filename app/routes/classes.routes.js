const authJwt = require("../middleware/authJwt.js");

module.exports = (app) => {
  const classes = require("../controllers/classes.controller.js");
  var router = require("express").Router();
  // Retrieve all Classes
  router.get("/", classes.findAll);
  router.get("/enrolled", [authJwt.verifyToken, authJwt.isTeacher], classes.getEnrolledClass);
  router.get("/:id", [authJwt.verifyToken, authJwt.isTeacher], classes.getClassDetail)
  app.use("/api/classes", router);
};
