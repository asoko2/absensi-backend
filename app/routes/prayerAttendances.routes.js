module.exports = (app) => {
  const PrayerAttendances = require("../controllers/prayerAttendances.controller.js");
  var router = require("express").Router();
  // Retrieve all PrayerAttendancesPrayerAttendances
  // router.get("/", PrayerAttendances.findAll);
  // SAVE PRAYER ATTENDANCES
  router.post('/save-location', PrayerAttendances.saveLocation)
  router.post('/save-picture', PrayerAttendances.savePicture)
  // Retrieve a single Prayer with id
  router.post("/today", PrayerAttendances.findTodayAttendances);
  // Update a Prayer with id
  // router.put("/:id", PrayerAttendances.update);
  // Delete a Prayer with id
  // router.delete("/:id", PrayerAttendances.delete);
  app.use("/api/prayer-attendances", router);
};
