module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departementId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });

  return User;
};
