const { authJwt } = require("../middleware");

module.exports = (app) => {
  const CourseEnrollment = require("../controllers/courseEnrollment.controller");
  var router = require("express").Router();

  router.post('/active', [authJwt.verifyToken], CourseEnrollment.findActiveCourse)
  router.get('/enrolled',
    [authJwt.verifyToken, authJwt.isTeacher],
    CourseEnrollment.getEnrolledCourse
  )

  app.use("/api/course-enrollment", router);
};
