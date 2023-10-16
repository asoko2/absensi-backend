module.exports = (sequelize, DataTypes) => {
  const Prayers = sequelize.define('prayers', {
    prayer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  })

  return Prayers
}