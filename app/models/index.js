const dbConfig = require('../config/db.config')

const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    }
  }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.classes = require('./classes.model')(sequelize, DataTypes)
db.courseAttendances = require('./course_attendances.model')(sequelize, DataTypes)
db.courses = require('./courses.model')(sequelize, DataTypes)
db.prayerAttendances = require('./prayer_attendances.model')(sequelize, DataTypes)
db.prayers = require('./prayers.model')(sequelize, DataTypes)
db.students = require('./students.model')(sequelize, DataTypes)
db.teachers = require('./teachers.model')(sequelize, DataTypes)
db.users = require('./users.model')(sequelize, DataTypes)
db.courseEnrollment = require('./course_enrollment.model')(sequelize, DataTypes)

// Relation between course and class
db.courses.belongsToMany(db.classes, {
  through: 'course_in_class',
})
db.classes.belongsToMany(db.courses, {
  through: 'course_in_class',
})

// Relation between course_attendances and course
db.courseAttendances.belongsTo(db.courses)
db.courses.hasMany(db.courseAttendances)

// Relation between student and course_attendances
db.courseAttendances.belongsTo(db.students)
db.students.hasMany(db.courseAttendances)

// Relation between classes and course_attendances
db.courseAttendances.belongsTo(db.classes)
db.classes.hasMany(db.courseAttendances)

// COURSE ENROLLMENT
db.courseEnrollment.belongsTo(db.classes, {
  foreignKey: 'classId'
})
db.courseEnrollment.belongsTo(db.teachers, {
  foreignKey: 'teacherId'
})
db.courseEnrollment.belongsTo(db.courses, {
  foreignKey: 'courseId'
})
db.classes.hasMany(db.courseEnrollment)
db.teachers.hasMany(db.courseEnrollment)
db.courses.hasMany(db.courseEnrollment)

// Relation between student and class
db.classes.hasMany(db.students, {
  foreignKey: 'classId',
})
db.students.belongsTo(db.classes)

// PRAYER ATTENDANCES
db.prayerAttendances.belongsTo(db.students)
db.prayerAttendances.belongsTo(db.prayers)
db.prayers.hasMany(db.prayerAttendances)
db.students.hasMany(db.prayerAttendances)

// Relation between USERS WITH STUDENTS and TEACHERS
db.users.hasMany(db.students)
db.users.hasMany(db.teachers)
db.students.hasMany(db.users)
db.teachers.hasMany(db.users)

module.exports = db