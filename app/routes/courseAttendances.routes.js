module.exports = (app) => {
  const CourseAttendances = require("../controllers/courseAttendances.controller.js");
  var router = require("express").Router();
  // Retrieve all CourseAttendancesCourseAttendances
  // router.get("/", CourseAttendances.findAll);
  // SAVE COURSE ATTENDANCES
  router.post('/save-location', CourseAttendances.saveLocation)
  router.post('/save-picture', CourseAttendances.savePicture)
  // Retrieve a single Course with id
  
  // Update a Course with id
  // router.put("/:id", CourseAttendances.update);
  // Delete a Course with id
  // router.delete("/:id", CourseAttendances.delete);
  app.use("/api/course-attendances", router);
};
