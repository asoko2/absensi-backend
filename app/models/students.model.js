module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define('students', {
    name: {
      type: DataTypes.STRING,
    },
    nisn: {
      type: DataTypes.STRING,
    },
    nik: {
      type: DataTypes.STRING,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
    },
    gender: {
      type: DataTypes.ENUM('l','p'),
    },
  })

  return Students
}