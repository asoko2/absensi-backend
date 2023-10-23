const uploadFileMiddleware = require('../middleware/upload')
const db = require('../models')
const PrayerAttendances = db.prayerAttendances
const Prayers = db.prayers
const Op = db.Sequelize.Op
const moment = require('moment')

exports.savePicture = async (req, res) => {

  const file = await uploadFileMiddleware(req, res)

  if (req.file == undefined) {
    return res.status(400).send({ message: "Pilih file terlebih dahulu" })
  }

  PrayerAttendances.findOne({
    where: {
      [Op.and]: [
        { studentId: req.studentId },
        { prayerId: req.body.prayer_id },
        db.Sequelize.where(db.Sequelize.fn('date', db.Sequelize.col('datetime')), date)
      ]
    }
  })
    .then(data => {
      if (data) {
        PrayerAttendances.update({
          image: req.file.filename,
        }, {
          where: {
            [Op.and]: [
              { studentId: req.studentId },
              { prayerId: req.body.prayer_id },
              db.Sequelize.where(db.Sequelize.fn('date', db.Sequelize.col('datetime')), date)
            ]
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

  const date = moment().subtract(4, 'days').toDate()

  PrayerAttendances.findOne({
    where: {
      [Op.and]: [
        { studentId: req.studentId },
        { prayerId: req.body.prayer_id },
        db.Sequelize.where(db.Sequelize.fn('date', db.Sequelize.col('datetime')), date)
      ]
    }
  })
    .then(data => {

      if (data) {
        PrayerAttendances.update({
          location: point,
        }, {
          where: {
            [Op.and]: [
              { studentId: req.studentId },
              { prayerId: req.body.prayer_id },
              db.Sequelize.where(db.Sequelize.fn('date', db.Sequelize.col('datetime')), date)
            ]
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
          datetime: date
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

exports.getAttendancesHistory = (req, res) => {
  PrayerAttendances.findAll({
    where: {
      studentId: req.studentId,
    },
    include: [
      {
        model: Prayers
      }
    ],
    order: [
      ['datetime', 'desc']
    ]
  })
    .then(data => {
      const dateArray = []
      data.forEach(element => {
        let dateObj = {}
        const formattedDate = moment(element.datetime).format('ddd, DD MMMM YYYY')
        const date = moment(element.datetime).format('YYYY-MM-DD')

        dateObj['formattedDate'] = formattedDate
        dateObj['date'] = date
        dateObj['history'] = []

        const filteredData = data.filter((e) => moment(e.datetime).format('YYYY-MM-DD') === date)
        dateObj['history'].push(filteredData)

        const findDate = dateArray.find((e) => e.date == date)
        if (!findDate) dateArray.push(dateObj)

      });

      res.send(dateArray)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Terjadi Kesalahan"
      })
    })
}