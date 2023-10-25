const db = require('../models')
const Courses = db.courses
const Op = db.Sequelize.Op

// Create and Save new Courses
exports.create = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    res.status(400).send({
      message: "Nama harus diisi"
    })
    return
  }

  // Create Courses Instances
  const courses = {
    course_name: req.body.name,
  }

  // Save Courses to DB
  Courses.create(courses)
    .then((data) => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Terjadi kesalahan"
      })
    })
}

// Retrieve All Courses from db
exports.findAll = (req, res) => {
  const name = req.query.name
  var condition = name ? { course_name: { [Op.iLike]: `%${name}%` } } : null
  Courses.findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Tidak bisa ambil data mata pelajaran"
      })
    })
}

// Find single courses
exports.findOne = (req, res) => {
  const id = req.params.id

  Courses.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Courses with id ${id}`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Courses"
      })
    })
}

// Update a courses by the id
exports.update = (req, res) => {
  const id = req.params.id
  Courses.update(req.body, {
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Courses added successfully"
        })
      } else {
        res.send({
          message: `Cannot update Courses with id=${id}`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Courses"
      })
    })
}

// Delete a Courses
exports.delete = (req, res) => {
  const id = req.params.id
  Courses.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Courses deleted"
        })
      } else {
        res.send({
          message: `Cannot delete courses ${id}`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Could not delete Courses"
      })
    })
}