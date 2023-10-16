module.exports = (sequelize, DataTypes) => {
  const PrayerAttendances = sequelize.define('prayer_attendances', {
    location: {
      type: DataTypes.GEOMETRY('POINT'),
    },
    image: {
      type: DataTypes.STRING,
    },
    datetime: {
      type: DataTypes.DATE,
    },
    description: {
      type: DataTypes.STRING,
    }
  })

  return PrayerAttendances
}