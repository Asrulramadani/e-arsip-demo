const controllers = {};

// login controllers
controllers.loginPage = require("./login.controller.js").loginPage;
controllers.loginMethod = require("./login.controller.js").loginMethod;

// dashboard conroller
controllers.dashboard = require("./dashboard.controller.js");

// logout controller
controllers.logout = require("./logout.contoller.js");

// category controllers
controllers.categoryPage = require("./category.controller.js").categoryPage;
controllers.categoryAdd = require("./category.controller.js").categoryAdd;
controllers.categoryDelete = require("./category.controller.js").categoryDelete;
controllers.categoryEditPage =
  require("./category.controller.js").categoryEditPage;
controllers.categoryEdit = require("./category.controller.js").categoryEdit;

// archive controllers
controllers.archivePage = require("./archive.controller.js").archivePage;
controllers.archiveAdd = require("./archive.controller.js").archiveAdd;
controllers.archiveDelete = require("./archive.controller.js").archiveDelete;
controllers.archiveEditPage =
  require("./archive.controller.js").archiveEditPage;
controllers.archiveView = require("./archive.controller.js").archiveView;
controllers.archiveByCategory =
  require("./archive.controller.js").archiveByCategory;
controllers.archiveEdit = require("./archive.controller.js").archiveEdit;

// departement controllers
controllers.departementPage =
  require("./departement.controller.js").departementPage;
controllers.departementAdd =
  require("./departement.controller.js").departementAdd;
controllers.departementDelete =
  require("./departement.controller.js").departementDelete;
controllers.departementEditPage =
  require("./departement.controller.js").departementEditPage;
controllers.departementEdit =
  require("./departement.controller.js").departementEdit;

// user controllers
controllers.userPage = require("./user.controller.js").userPage;
controllers.userAdd = require("./user.controller.js").userAdd;
controllers.userDelete = require("./user.controller.js").userDelete;
controllers.userEditPage = require("./user.controller.js").userEditPage;
controllers.userEdit = require("./user.controller.js").userEdit;

// page not found controller
controllers.notFound = require("./notFound.controller.js");

module.exports = controllers;
