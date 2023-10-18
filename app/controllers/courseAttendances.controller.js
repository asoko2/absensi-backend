const uploadFileMiddleware = require('../middleware/upload')
const db = require('../models')
const CourseAttendances = db.courseAttendances
const Op = db.Sequelize.Op
const moment = require('moment')

exports.savePicture = async (req, res) => {

  const file = await uploadFileMiddleware(req, res)

  console.log('uploaded file: ', file)

  if (req.file == undefined) {
    return res.status(400).send({ message: "Pilih file terlebih dahulu" })
  }

  CourseAttendances.findOne({
    where: {
      studentId: req.body.student_id,
      courseId: req.body.course_id,
    }
  })
    .then(data => {
      if (data) {
        CourseAttendances.update({
          image: req.file.filename,
        }, {
          where: {
            studentId: req.body.student_id,
            courseId: req.body.course_id,
          }
        })
          .then(() => {
            res.send({ message: "Berhasil update foto" })
          })
      } else {
        CourseAttendances.create({
          studentId: req.body.student_id,
          courseId: req.body.course_id,
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

  CourseAttendances.findOne({
    where: {
      studentId: req.body.student_id,
      courseId: req.body.course_id,
      classId: req.body.class_id,
    }
  })
    .then(data => {

      if (data) {
        CourseAttendances.update({
          location: point,
        }, {
          where: {
            studentId: req.body.student_id,
            courseId: req.body.course_id,
            classId: req.body.class_id,
          }
        })
          .then(() => {
            res.send({ message: "Berhasil update lokasi" })
          })
      } else {
        CourseAttendances.create({
          studentId: req.body.student_id,
          courseId: req.body.course_id,
          classId: req.body.class_id,
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