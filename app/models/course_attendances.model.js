module.exports = (sequelize, DataTypes) => {
  const CourseAttendance = sequelize.define("course_attendances", {
    location: {
      type: DataTypes.GEOMETRY('POINT'),
    },
    image: {
      type: DataTypes.STRING,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    }
  });

  return CourseAttendance;
};