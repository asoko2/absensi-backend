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
  console.log('token: ', token)

  jwt.verify(token, config.secret, (err, decoded) => {
    console.log('decoded: ', decoded)
    console.log('error: ', err)
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      })
    }
    req.userId = decoded.id
    console.log('Token verified')
    console.log('RES')
    console.log(res)
    console.log('socket')
    console.log(res.socket)
    console.log('socket -> parser')
    console.log(res.socket.parser)
    console.log('NEXT')
    console.log(next)
    next()
  })
}

isTeacher = (req, res, next) => {
  // User.findByPk(req.)
}

const authJwt = {
  verifyToken: verifyToken,
  isTeacher: isTeacher,
}

module.exports = authJwt