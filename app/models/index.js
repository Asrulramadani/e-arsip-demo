
const Sequelize = require("sequelize");
// const status = "development";

// if (status === "development") {
//   dbConfig = dbConfig.development;
// } else {
//   dbConfig = dbConfig.production;
// }

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   // dialectOptions: {
//   //   ssl: {
//   //     rejectUnautorized: true,
//   //   },
//   // },

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
// });



const sequelize = new Sequelize(process.env.DB, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: "postgres",

  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.departement = require("./departement.model.js")(sequelize, Sequelize);
db.archive = require("./archive.model.js")(sequelize, Sequelize);

db.user.belongsTo(db.departement, {
  foreignKey: "departementId",
  as: "departement",
  onDelete: "SET NULL",
});
db.archive.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
  onDelete: "SET NULL"
});
db.archive.belongsTo(db.departement, {
  foreignKey: "departementId",
  as: "departement",
  onDelete: "SET NULL"
});
db.archive.belongsTo(db.category, {
  foreignKey: "categoryId",
  as: "category",
  onDelete: "SET NULL"
});

module.exports = db;
