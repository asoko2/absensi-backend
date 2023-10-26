const authJwt = require("../middleware/authJwt.js");

module.exports = (app) => {
  const courses = require("../controllers/courses.controller.js");
  var router = require("express").Router();
  // Retrieve all Courses
  router.get("/", courses.findAll);
  // router.get("/enrolled", [authJwt.verifyToken, authJwt.isTeacher], courses.getEnrolledClass);
  router.get("/:id", [authJwt.verifyToken, authJwt.isTeacher], courses.getClassDetail)
  // router.get("/enrolled/:id", [authJwt.verifyToken, authJwt.isTeacher], courses.getClassEnrollmentDetail)
  // router.put("/enrolled/:id", [authJwt.verifyToken, authJwt.isTeacher], courses.changeClassActiveState)

  app.use("/api/courses", router);
};
