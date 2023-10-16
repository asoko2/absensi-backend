const db = require('../models')
const Prayers = db.prayers
const Op = db.Sequelize.Op

exports.findAll = (req, res) => {
  Prayers.findAll({
    order: [
      ['id', 'ASC']
    ]
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(404).send({
        message: err.message || "Data Tidak Ditemukan"
      })
    })
}