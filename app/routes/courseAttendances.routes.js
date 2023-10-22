const authJwt = require("../middleware/authJwt.js");

module.exports = (app) => {
  const CourseAttendances = require("../controllers/courseAttendances.controller.js");
  var router = require("express").Router();

  router.post('/save-location', [authJwt.verifyToken, authJwt.isStudent], CourseAttendances.saveLocation)
  router.post('/save-picture', [authJwt.verifyToken, authJwt.isStudent], CourseAttendances.savePicture)
  router.get('/history', [authJwt.verifyToken, authJwt.isStudent], CourseAttendances.getAttendancesHistory)
  app.use("/api/course-attendances", router);
};
