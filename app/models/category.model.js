module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define(
      "categories",
      {
        name: Sequelize.STRING,
      },
      {
        freezeTableName: true,
      }
    );
  
    return Category;
  };
  