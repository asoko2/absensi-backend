module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define("courses", {
    course_name: {
      type: DataTypes.STRING
    },
  });

  return Courses;
};