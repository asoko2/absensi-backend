const authJwt = require("../middleware/authJwt.js");

module.exports = (app) => {
  const classes = require("../controllers/classes.controller.js");
  var router = require("express").Router();
  // Retrieve all Classes
  router.get("/", [authJwt.verifyToken], classes.findAll);
  router.get("/enrolled", [authJwt.verifyToken, authJwt.isTeacher], classes.getEnrolledClass);
  router.get("/:id", [authJwt.verifyToken, authJwt.isTeacher], classes.getClassDetail)
  router.get("/enrolled/:id", [authJwt.verifyToken, authJwt.isTeacher], classes.getClassEnrollmentDetail)
  router.put("/enrolled/:id", [authJwt.verifyToken, authJwt.isTeacher], classes.changeClassActiveState)

  app.use("/api/classes", router);
};
