module.exports = (sequelize, Sequelize) => {
  const Archive = sequelize.define("archive", {
    number: Sequelize.STRING,
    name: Sequelize.STRING,
    desc: Sequelize.STRING,
    file_name: Sequelize.STRING,
    file_size: Sequelize.FLOAT,
    userId: Sequelize.INTEGER,
    departementId: Sequelize.INTEGER,
    categoryId: Sequelize.INTEGER,
  });

  return Archive;
};
