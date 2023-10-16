const db = require('../models')
const PrayerAttendances = db.prayerAttendances
const Op = db.Sequelize.Op
const moment = require('moment')

exports.create = (req, res) => {
  const point = { type: 'Point', coordinates: [req.body.lattitude, req.body.longitude] }; // GeoJson format: [lng, lat]

  const yesterday = moment().subtract(1, 'days')
  console.log('yesterday : ', yesterday.toDate())

  PrayerAttendances.create({
    studentId: req.body.student_id,
    prayerId: req.body.prayer_id,
    location: point,
    datetime: yesterday
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Terjadi Kesalahan",
      })
    })
}

exports.findTodayAttendances = (req, res) => {

  const today = moment().format('YYYY-MM-DD')
  PrayerAttendances.findAll({
    where: {
      [Op.and]: [
        db.Sequelize.where(db.Sequelize.fn('date', db.Sequelize.col('datetime')), '=', today),
        { studentId: req.body.student_id },
      ]
    }
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan"
      })
    })
}