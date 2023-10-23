const uploadFileMiddleware = require('../middleware/upload')
const db = require('../models')
const CourseAttendances = db.courseAttendances
const Courses = db.courses
const Op = db.Sequelize.Op
const moment = require('moment')

exports.savePicture = async (req, res) => {

  const file = await uploadFileMiddleware(req, res)

  if (req.file == undefined) {
    return res.status(400).send({ message: "Pilih file terlebih dahulu" })
  }

  CourseAttendances.findOne({
    where: {
      [Op.and]: [
        { studentId: req.studentId },
        { courseId: req.body.course_id },
        { classId: req.body.class_id },
        db.Sequelize.where(db.Sequelize.fn('date', db.Sequelize.col('datetime')), date)
      ]
    }
  })
    .then(data => {
      if (data) {
        CourseAttendances.update({
          image: req.file.filename,
        }, {
          where: {
            [Op.and]: [
              { studentId: req.studentId },
              { courseId: req.body.course_id },
              { classId: req.body.class_id },
              db.Sequelize.where(db.Sequelize.fn('date', db.Sequelize.col('datetime')), date)
            ]
          }
        })
          .then(() => {
            res.send({ message: "Berhasil update foto" })
          })
      } else {
        CourseAttendances.create({
          studentId: req.studentId,
          courseId: req.body.course_id,
          classId: req.body.class_id,
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

  const date = moment.now()

  CourseAttendances.findOne({
    where: {
      [Op.and]: [
        { studentId: req.studentId },
        { courseId: req.body.course_id },
        { classId: req.body.class_id },
        db.Sequelize.where(db.Sequelize.fn('date', db.Sequelize.col('datetime')), date)
      ]
    }
  })
    .then(data => {

      if (data) {
        CourseAttendances.update({
          location: point,
        }, {
          where: {
            [Op.and]: [
              { studentId: req.studentId },
              { courseId: req.body.course_id },
              { classId: req.body.class_id },
              db.Sequelize.where(db.Sequelize.fn('date', db.Sequelize.col('datetime')), date)
            ]
          }
        })
          .then(() => {
            res.send({ message: "Berhasil update lokasi" })
          })
      } else {
        CourseAttendances.create({
          studentId: req.studentId,
          courseId: req.body.course_id,
          classId: req.body.class_id,
          location: point,
          // datetime: moment.now()
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

exports.getAttendancesHistory = (req, res) => {
  CourseAttendances.findAll({
    where: {
      studentId: req.studentId,
    },
    include: [
      {
        model: Courses
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