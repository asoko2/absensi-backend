const db = require('../models')
const Classes = db.classes
const Op = db.Sequelize.Op

// Create and Save new Classes
exports.create = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    res.status(400).send({
      message: "Nama harus diisi"
    })
    return
  }

  // Create Classes Instances
  const classes = {
    class_name: req.body.name,
  }

  // Save Classes to DB
  Classes.create(classes)
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

// Retrieve All Classes from db
exports.findAll = (req, res) => {
  const name = req.query.name
  var condition = name ? { class_name: { [Op.iLike]: `%${name}%` } } : null
  Classes.findAll({ where: condition })
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

// Find single classes
exports.findOne = (req, res) => {
  const id = req.params.id

  Classes.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Classes with id ${id}`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Classes"
      })
    })
}

// Update a classes by the id
exports.update = (req, res) => {
  const id = req.params.id
  Classes.update(req.body, {
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Classes added successfully"
        })
      } else {
        res.send({
          message: `Cannot update Classes with id=${id}`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Classes"
      })
    })
}

// Delete a Classes
exports.delete = (req, res) => {
  const id = req.params.id
  Classes.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Classes deleted"
        })
      } else {
        res.send({
          message: `Cannot delete classes ${id}`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Could not delete Classes"
      })
    })
}

//Find all published tutorials
// exports.findAllSomething = (req, res) => {
//   console.log("execute create data");
//   Classes.findAll({ where: { condition: true } }) //set the condition
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving classess.",
//       });
//     });
// };
