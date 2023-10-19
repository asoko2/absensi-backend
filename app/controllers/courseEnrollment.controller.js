const db = require('../models')
const CourseEnrollments = db.courseEnrollment
const Courses = db.courses
const Op = db.Sequelize.Op
const moment = require('moment')

exports.findActiveCourse = (req, res) => {

  const today = moment().format('YYYY-MM-DD')
  const time = '08:30:32'

  CourseEnrollments.findAll({
    where: {
      [Op.and]: [
        { classId: req.body.class_id },
        { start_time: { [Op.lt]: time } },
        { end_time: { [Op.gt]: time } },  
      ]
    },
    include: [
      {
        model: Courses,
      }
    ]
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

exports.getEnrolledCourse = (req, res) => {
  CourseEnrollments.findAll({
    where: {
      teacherId: req.teacherId
    },
    include: [
      {
        model: Courses,
      }
    ]
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