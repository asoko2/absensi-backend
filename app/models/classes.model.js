module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define("classes", {
    class_name: {
      type: DataTypes.STRING
    },
  });

  return Class;
};