const Classes = require('./classes.model')
const Courses = require('./courses.model')

module.exports = (sequelize, DataTypes) => {
  const CourseInClass = sequelize.define("course_in_class", {
    courseId: {
      type: DataTypes.INTEGER,
      references: {
        model: Courses,
        key: 'id'
      }
    },
    classId: {
      type: DataTypes.INTEGER,
      references: {
        model: Classes,
        key: 'id'
      }
    },
  });

  return CourseInClass;
};