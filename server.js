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
const CourseInClass = db.courseInClass

// FOR PRODUCTION USE LINE BELOW
db.sequelize.sync()
// db.sequelize.sync({ force: true }).then(() => {
//   initial()
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

  Courses.create({
    id: 5,
    course_name: "ASJ",
    course_code: "ASJ",
  })

  Courses.create({
    id: 6,
    course_name: "ADM SISTEM",
    course_code: "ADMS",
  })

  Courses.create({
    id: 7,
    course_name: "MTK",
    course_code: "MTK",
  })

  Courses.create({
    id: 8,
    course_name: "Jarkomdas",
    course_code: "JARK",
  })

  Courses.create({
    id: 9,
    course_name: "Muhadharah",
    course_code: "MUHD",
  })

  Courses.create({
    id: 10,
    course_name: "Tekwan",
    course_code: "TKWN",
  })

  CourseInClass.create({ id: 1, classId: 1, courseId: 1, })
  CourseInClass.create({ id: 2, classId: 3, courseId: 1, })
  CourseInClass.create({ id: 3, classId: 5, courseId: 1, })
  CourseInClass.create({ id: 4, classId: 1, courseId: 2, })
  CourseInClass.create({ id: 5, classId: 3, courseId: 2, })
  CourseInClass.create({ id: 6, classId: 5, courseId: 2, })
  CourseInClass.create({ id: 7, classId: 1, courseId: 3, })
  CourseInClass.create({ id: 8, classId: 2, courseId: 3, })
  CourseInClass.create({ id: 9, classId: 3, courseId: 3, })
  CourseInClass.create({ id: 10, classId: 4, courseId: 3, })
  CourseInClass.create({ id: 11, classId: 5, courseId: 3, })
  CourseInClass.create({ id: 12, classId: 6, courseId: 3, })
  CourseInClass.create({ id: 13, classId: 1, courseId: 4, })
  CourseInClass.create({ id: 14, classId: 2, courseId: 4, })
  CourseInClass.create({ id: 15, classId: 3, courseId: 4, })
  CourseInClass.create({ id: 16, classId: 4, courseId: 4, })
  CourseInClass.create({ id: 17, classId: 5, courseId: 4, })
  CourseInClass.create({ id: 18, classId: 6, courseId: 4, })
  CourseInClass.create({ id: 19, classId: 1, courseId: 5, })
  CourseInClass.create({ id: 20, classId: 3, courseId: 5, })
  CourseInClass.create({ id: 21, classId: 5, courseId: 5, })
  CourseInClass.create({ id: 22, classId: 2, courseId: 6, })
  CourseInClass.create({ id: 23, classId: 4, courseId: 6, })
  CourseInClass.create({ id: 24, classId: 6, courseId: 6, })
  CourseInClass.create({ id: 25, classId: 1, courseId: 7, })
  CourseInClass.create({ id: 26, classId: 2, courseId: 7, })
  CourseInClass.create({ id: 27, classId: 3, courseId: 7, })
  CourseInClass.create({ id: 28, classId: 4, courseId: 7, })
  CourseInClass.create({ id: 29, classId: 5, courseId: 7, })
  CourseInClass.create({ id: 30, classId: 6, courseId: 7, })
  CourseInClass.create({ id: 31, classId: 1, courseId: 8, })
  CourseInClass.create({ id: 32, classId: 3, courseId: 8, })
  CourseInClass.create({ id: 33, classId: 5, courseId: 8, })
  CourseInClass.create({ id: 34, classId: 1, courseId: 9, })
  CourseInClass.create({ id: 35, classId: 2, courseId: 9, })
  CourseInClass.create({ id: 36, classId: 3, courseId: 9, })
  CourseInClass.create({ id: 36, classId: 4, courseId: 9, })
  CourseInClass.create({ id: 36, classId: 5, courseId: 9, })
  CourseInClass.create({ id: 36, classId: 6, courseId: 9, })
  CourseInClass.create({ id: 36, classId: 1, courseId: 10, })
  CourseInClass.create({ id: 36, classId: 3, courseId: 10, })
  CourseInClass.create({ id: 36, classId: 5, courseId: 10, })

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