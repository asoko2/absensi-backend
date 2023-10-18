module.exports = (app) => {
  const CourseEnrollment = require("../controllers/courseEnrollment.controller");
  var router = require("express").Router();
  // Retrieve all CourseEnrollmentCourseEnrollment
  // router.get("/", CourseEnrollment.findAll);
  // SAVE COURSE ENROLLMENT
  router.post('/active', CourseEnrollment.findActiveCourse)
  // router.post('/save-picture', CourseEnrollment.savePicture)
  // Retrieve a single Course with id

  // Update a Course with id
  // router.put("/:id", CourseEnrollment.update);
  // Delete a Course with id
  // router.delete("/:id", CourseEnrollment.delete);
  app.use("/api/course-enrollment", router);
};
