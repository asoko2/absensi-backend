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