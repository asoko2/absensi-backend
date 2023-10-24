const db = require('../models')
const authConfig = require('../config/auth.config')
const User = db.users
const Student = db.students
const Teacher = db.teachers
const Classes = db.classes
const Op = db.Sequelize.Op
const bcrypt = require('bcryptjs')

exports.getProfile = (req, res) => {
  User.findOne({
    where: {
      id: req.userId
    },
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt']
    }
  })
    .then((user) => {
      if (!user.studentId) {
        Teacher.findOne({
          where: {
            id: user.teacherId
          }
        }).then((data) => {
          user.dataValues.data = data
          res.send(user)
        })
          .catch(err => {
            res.status(500).send(err)
          })
      } else {
        Student.findOne({
          where: {
            id: user.studentId
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          include: [
            {
              model: Classes,
            }
          ]
        }).then((data) => {
          user.dataValues.data = data
          res.send(user)
        })
          .catch(err => {
            res.status(500).send(err)
          })

      }
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

exports.updateProfile = (req, res) => {
  User.findOne({
    where: {
      id: req.userId
    },
  })
    .then((user) => {
      if (!user.studentId) {
        Teacher.update({
          name: req.body.name,
          gender: req.body.gender,
          birth_date: req.body.date,
          nip: req.body.nip
        },{
          where: {
            id: user.teacherId
          }
        }).then(() => {
          res.send({message: "Berhasil update profil"})
        })
          .catch(err => {
            res.status(500).send(err)
          })
      } else {
        Student.update({
          name: req.body.name,
          gender: req.body.gender,
          birth_date: req.body.date,
          nik: req.body.nik
        },{
          where: {
            id: user.studentId
          }
        }).then(() => {
          res.send({message: "Berhasil update profil"})
        })
          .catch(err => {
            res.status(500).send(err)
          })

      }
    })
    .catch(err => {
      res.status(500).send(err)
    })
}