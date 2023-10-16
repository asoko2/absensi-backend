module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define("courses", {
    course_code: {
      type: DataTypes.STRING,
      unique: true
    },
    course_name: {
      type: DataTypes.STRING
    },
  });

  return Courses;
};