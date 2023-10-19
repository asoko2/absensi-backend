const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models')
const User = db.users
const Student = db.students
const Teacher = db.teachers

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"]
  // console.log('req: ', req)

  if (!token) {
    return res.status(403).send({
      message: "User not authenticated"
    })
  }
  jwt.verify(token,
    config.secret,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        })
      }
      req.userId = decoded.id
      next()
    })
}

isTeacher = (req, res, next) => {
  const decodedToken = jwt.decode(req.headers['x-access-token'])
  User.findByPk(decodedToken.id).then(user => {
    req.teacherId = user.teacherId
    next()
  })
    .catch(err => {
      res.status(403).send({
        message: "Anda tidak terdaftar"
      })
    })
}

const authJwt = {
  verifyToken: verifyToken,
  isTeacher: isTeacher,
}

module.exports = authJwt