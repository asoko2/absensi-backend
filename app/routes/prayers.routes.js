module.exports = (app) => {
  const prayers = require("../controllers/prayers.controller.js");
  var router = require("express").Router();
  // Retrieve all Prayers
  router.get("/", prayers.findAll);
  // Retrieve a single Prayer with id
  // router.get("/:id", prayers.findOne);
  // Update a Prayer with id
  // router.put("/:id", prayers.update);
  // Delete a Prayer with id
  // router.delete("/:id", prayers.delete);
  app.use("/api/prayers", router);
};
