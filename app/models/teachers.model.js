module.exports = (sequelize, DataTypes) => {
  const Teachers = sequelize.define('teachers', {
    name: {
      type: DataTypes.STRING,
    },
    nip: {
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

  return Teachers
}