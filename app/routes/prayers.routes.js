const authJwt = require("../middleware/authJwt.js");

module.exports = (app) => {
  const prayers = require("../controllers/prayers.controller.js");

  var router = require("express").Router();
  router.get("/", [authJwt.verifyToken], prayers.findAll);

  app.use("/api/prayers", router);
};
