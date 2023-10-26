const authJwt = require("../middleware/authJwt.js");

module.exports = (app) => {
  const PrayerAttendances = require("../controllers/prayerAttendances.controller.js");
  var router = require("express").Router();

  router.post('/save-location', [authJwt.verifyToken, authJwt.isStudent], PrayerAttendances.saveLocation)
  router.post('/save-picture', [authJwt.verifyToken, authJwt.isStudent], PrayerAttendances.savePicture)
  router.post("/today", [authJwt.verifyToken, authJwt.isStudent], PrayerAttendances.findTodayAttendances);
  router.get('/history', [authJwt.verifyToken, authJwt.isStudent], PrayerAttendances.getAttendancesHistory)

  app.use("/api/prayer-attendances", router);
};
