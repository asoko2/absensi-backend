const db = require('../models')
const authConfig = require('../config/auth.config')
const User = db.users
const Op = db.Sequelize.Op
const bcrypt = require('bcryptjs')

exports.getProfile = (req, res) => {
  return res.send({
    req: req
  })
}