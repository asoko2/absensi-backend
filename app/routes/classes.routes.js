const authJwt = require("../middleware/authJwt.js");

module.exports = (app) => {
  const classes = require("../controllers/classes.controller.js");
  var router = require("express").Router();
  // Retrieve all Classes
  router.get("/", classes.findAll);
  router.get("/enrolled", [authJwt.verifyToken, authJwt.isTeacher], classes.getEnrolledClass);
  // Retrieve a single Prayer with id
  // router.get("/:id", classes.findOne);
  // Update a Prayer with id
  // router.put("/:id", classes.update);
  // Delete a Prayer with id
  // router.delete("/:id", classes.delete);
  app.use("/api/classes", router);
};
