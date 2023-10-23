module.exports = (app) => {
  const prayers = require("../controllers/prayers.controller.js");

  var router = require("express").Router();
  router.get("/", prayers.findAll);
  
  app.use("/api/prayers", router);
};
