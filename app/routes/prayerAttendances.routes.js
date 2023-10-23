const authJwt = require("../middleware/authJwt.js");

module.exports = (app) => {
  const PrayerAttendances = require("../controllers/prayerAttendances.controller.js");
  var router = require("express").Router();

  router.post('/save-location', PrayerAttendances.saveLocation)
  router.post('/save-picture', PrayerAttendances.savePicture)
  router.post("/today", PrayerAttendances.findTodayAttendances);
  router.get('/history', [authJwt.verifyToken, authJwt.isStudent], PrayerAttendances.getAttendancesHistory)

  app.use("/api/prayer-attendances", router);
};
