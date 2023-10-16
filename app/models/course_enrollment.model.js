module.exports = (sequelize, DataTypes) => {
  const CourseEnrollment = sequelize.define('course_enrollment', {
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    start_time: {
      type: DataTypes.TIME,
    },
    end_time: {
      type: DataTypes.TIME,
    },
    day: {
      type: DataTypes.ENUM('0', '1', '2', '3', '4', '5', '6')
    }
  })

  return CourseEnrollment
}