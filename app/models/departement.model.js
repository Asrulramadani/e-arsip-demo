module.exports = (sequelize, Sequelize) => {
    const Departement = sequelize.define(
      "departement",
      {
        name: Sequelize.STRING,
      }
    );
  
    return Departement;
  };
  