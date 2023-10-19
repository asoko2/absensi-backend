const express = require('express')
const cors = require('cors')

const app = express()

global.__basedir = __dirname

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

const db = require('./app/models')
const Classes = db.classes
const Courses = db.courses
const Prayers = db.prayers

// FOR PRODUCTION USE LINE BELOW
db.sequelize.sync()
// db.sequelize.sync({ force: true }).then(() => {
// initial()
//   console.log('Db dropped and synced')
// })

// ROUTING
app.get("/", (req, res) => {
  res.json({ message: "Welcome to absensi " })
})
// IMPORT ROUTES
require('./app/routes/auth.routes')(app)
require('./app/routes/prayers.routes')(app)
require('./app/routes/prayerAttendances.routes')(app)
require('./app/routes/courseAttendances.routes')(app)
require('./app/routes/courseEnrollment.routes')(app)
require('./app/routes/user.routes')(app)
require('./app/routes/classes.routes')(app)

// SET PORT AND LISTEN
const PORT = process.env.POST || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})


function initial() {
  Classes.create({
    id: 1,
    class_name: "X TKJ"
  })

  Classes.create({
    id: 2,
    class_name: "X RPL"
  })

  Classes.create({
    id: 3,
    class_name: "XI TKJ"
  })

  Classes.create({
    id: 4,
    class_name: "XI RPL"
  })

  Classes.create({
    id: 5,
    class_name: "XII TKJ"
  })

  Classes.create({
    id: 6,
    class_name: "XII RPL"
  })

  Courses.create({
    id: 1,
    course_name: "Teknologi WAN",
    course_code: "WAN",
  })

  Courses.create({
    id: 2,
    course_name: "AIJ",
    course_code: "AIJ",
  })

  Courses.create({
    id: 3,
    course_name: "Bahasa Inggris",
    course_code: "ENG",
  })

  Courses.create({
    id: 4,
    course_name: "Bahasa Indonesia",
    course_code: "INDO",
  })

  Prayers.create({
    id: 1,
    prayer_name: "Subuh",
    start_time: "05:00:00",
    end_time: "06:00:00",
  })

  Prayers.create({
    id: 2,
    prayer_name: "Zuhur",
    start_time: "12:30:00",
    end_time: "13:15:00",
  })

  Prayers.create({
    id: 3,
    prayer_name: "Ashar",
    start_time: "15:30:00",
    end_time: "16:00:00",
  })

  Prayers.create({
    id: 4,
    prayer_name: "Maghrib",
    start_time: "18:15:00",
    end_time: "18:45:00",
  })

  Prayers.create({
    id: 5,
    prayer_name: "Isya",
    start_time: "19:30:00",
    end_time: "20:10:00",
  })

}