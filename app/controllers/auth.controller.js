const db = require('../models')
const authConfig = require('../config/auth.config')
const User = db.users

const Op = db.Sequelize.Op

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = async (req, res) => {
  if (req.body.role === 'student') {
    if (!req.body.email || !req.body.password || !req.body.nisn || !req.body.class_id) {
      return res.status(400).json({
        message: "Tidak boleh ada field yang kosong",
      })
    }
  } else {
    if (!req.body.email || !req.body.password || !req.body.nik || !req.body.course_id) {
      return res.status(400).json({
        message: "Tidak boleh ada field yang kosong",
      })
    }
  }

  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 15),
    role: req.body.role,
  })
    .then(user => {

      if (user.role === 'student') {
        const Student = db.students

        Student.create({
          nisn: req.body.nisn,
          classId: req.body.class_id,
          userId: user.id,
        })
          .then((student) => {
            User.update(
              {
                studentId: student.id,
              },
              {
                where: { id: user.id }
              }
            ).then(() => {
              return res.status(201).json({
                message: "Registrasi User Berhasil"
              })
            })
              .catch(err => {
                return req.status(500).json({
                  message: err.message
                })
              })

          })
          .catch((err) => {
            return res.status(500).json({
              message: err.message
            })
          })
      } else {
        const Teacher = db.teachers
        const CourseInClass = db.courseInClass

        Teacher.create({
          nik: req.body.nik,
          userId: user.id,
        })
          .then((teacher) => {
            User.update(
              {
                teacherId: teacher.id,
              },
              {
                where: { id: user.id }
              }
            ).then(() => {
              CourseInClass.findAll({
                where: {
                  courseId: req.body.course_id
                },
                attributes: ['classId']
              }).then(data => {
                data.forEach(async (e) => {
                  const CourseEnrollment = db.courseEnrollment

                  await CourseEnrollment.create({
                    classId: e.classId,
                    courseId: req.body.course_id,
                    teacherId: teacher.id
                  }).then(() => {
                    console.log('berhasil create courseenerollment')
                  })
                });

                return res.status(201).json({
                  message: "Registrasi User Berhasil"
                })
              }).catch(err => {
                return res.send({ message: "Terjadi Kesalahan" })
              })

            })
              .catch(err => {
                return req.status(500).json({
                  message: err.message
                })
              })
          })
          .catch((err) => {
            return res.status(500).json({
              message: err.message
            })
          })
      }
    })
    .catch(err => {
      return res.status(500).send({ message: err.message })
    })
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User not found" })
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )

      if (!passwordIsValid) return res.status(401).send({ accessToken: null, message: "Invalid Password" })

      var token = jwt.sign({ id: user.id },
        authConfig.secret,
        {
          expiresIn: 86400,
          algorithm: 'HS256', //24 hours
          allowInsecureKeySizes: true
        }
      )

      return res.status(200).json({
        id: user.id,
        email: user.email,
        role: user.role,
        accessToken: token
      })
    })
    .catch(err => {
      return res.status(400).json({
        message: err.message || "Gagal Login"
      })
    })
}