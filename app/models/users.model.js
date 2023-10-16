module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('student', 'teacher')
    }
  })

  return Users
}