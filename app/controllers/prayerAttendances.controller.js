const uploadFileMiddleware = require('../middleware/upload')
const db = require('../models')
const PrayerAttendances = db.prayerAttendances
const Op = db.Sequelize.Op
const moment = require('moment')

exports.savePicture = async (req, res) => {

  const file = await uploadFileMiddleware(req, res)

  console.log('uploaded file: ', file)

  if (req.file == undefined) {
    return res.status(400).send({ message: "Pilih file terlebih dahulu" })
  }

  PrayerAttendances.findOne({
    where: {
      studentId: req.body.student_id,
      prayerId: req.body.prayer_id,
    }
  })
    .then(data => {

      if (data) {
        PrayerAttendances.update({
          image: req.file.filename,
        }, {
          where: {
            studentId: req.body.student_id,
            prayerId: req.body.prayer_id,
          }
        })
          .then(() => {
            res.send({ message: "Berhasil update foto" })
          })
      } else {
        PrayerAttendances.create({
          studentId: req.body.student_id,
          prayerId: req.body.prayer_id,
          image: req.file.filename,
          datetime: moment.now()
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
    })
}

exports.saveLocation = (req, res) => {
  const point = { type: 'Point', coordinates: [req.body.lattitude, req.body.longitude] }; // GeoJson format: [lng, lat]

  PrayerAttendances.findOne({
    where: {
      studentId: req.body.student_id,
      prayerId: req.body.prayer_id,
    }
  })
    .then(data => {

      if (data) {
        PrayerAttendances.update({
          location: point,
        }, {
          where: {
            studentId: req.body.student_id,
            prayerId: req.body.prayer_id,
          }
        })
          .then(() => {
            res.send({ message: "Berhasil update lokasi" })
          })
      } else {
        PrayerAttendances.create({
          studentId: req.body.student_id,
          prayerId: req.body.prayer_id,
          location: point,
          datetime: moment.now()
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