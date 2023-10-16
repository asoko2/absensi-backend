const db = require('../models')
const User = db.users
const Student = db.students
const Teacher = db.teachers

chedkDuplicate = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email }
  }).then(user => {
    if (user) return res.status(400).send({ message: "Email sudah terdaftar!!" })

    // Cek NISN dan NIK
    if (req.body.role === 'student') {
      Student.findOne({
        where: {
          nisn: req.body.nisn
        }
      }).then(student => {
        if (student) return res.status(400).send({ message: "NISN sudah terdaftar!!" })

        next()
      })
    } else {
      Teacher.findOne({
        where: {
          nik: req.body.nik.toString()
        }
      }).then(teacher => {
        if (teacher) return res.status(400).send({ message: "NIk sudah terdaftar!!" })

        next()
      })
    }
  })
}

const verifySignUp = {
  chedkDuplicate: chedkDuplicate
}

module.exports = verifySignUp