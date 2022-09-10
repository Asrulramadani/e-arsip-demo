// Sync dotenv (.env) file
require("dotenv").config();

const Express = require("express");
const app = Express();

const path = require("path");
const db = require("./app/models");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");

// setup view engine & views folder
app.set("view engine", "ejs");
app.set("views", "./app/views");

// set static folder for view
app.use(Express.static(path.join(__dirname, "app/public")));

// set static folder for view
app.use(
  "/file/archives",
  Express.static(path.join(__dirname, "app/public/uploads/archives"))
);

// parse requests of content-type - application/json
// app.use(Express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(Express.urlencoded({ extended: true }));

// setup method-override
app.use(methodOverride("_method"));

// setup cookie parser & session & flash
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// sync express-ejs-layout
app.use(expressLayouts);

// sync database
// db.sequelize
//   .sync()
//   .then(() => {
//     console.log("Database sync 😉");
//   })
//   .catch((err) => {
//     throw err;
//   });

// connect database
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected 😉");
  })
  .catch((err) => {
    throw err;
  });

// db.departement.create({
//   name: "operator",
// });

// routes
require("./app/routes")(app);

// const bcrypt = require("bcrypt");

// const user = {
//   username: "admin",
//   email: "hi@asrulramadani.tech",
//   password: bcrypt.hashSync("123", 10),
//   level: "admin",
//   departementId: 1,
//   picture: "asrul.jpeg",
// };

// db.user.create(user);

// running app on port based on .env file

app.listen(5000, () => {
  console.log(`🚀Server running at : http://localhost:${PORT} 🚀`);
});
