const util = require('util')
const multer = require('multer')
const moment = require('moment')
const maxSize = 2 * 1024 * 1024

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/public/uploads/")
  },
  filename: (req, file, cb) => {
    const random = Math.floor(Math.random() * 1000000000000)
    const name = file.originalname.replace(' ', '')
    cb(null, moment.now() + "_" + random + "_" + name)
  }
})

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize }
}).single('file')

let uploadFileMiddleware = util.promisify(uploadFile)
module.exports = uploadFileMiddleware