module.exports = (app) => {
  const {
    loginPage,
    loginMethod,
    logout,
    dashboard,
    categoryPage,
    categoryAdd,
    categoryDelete,
    categoryEdit,
    categoryEditPage,
    archivePage,
    archiveAdd,
    archiveDelete,
    archiveView,
    archiveByCategory,
    archiveEditPage,
    archiveEdit,
    departementPage,
    departementAdd,
    departementDelete,
    departementEdit,
    departementEditPage,
    userPage,
    userAdd,
    userDelete,
    userEdit,
    userEditPage,
    notFound,
  } = require("../controllers");

  const { uploadArchive } = require("../utils");

  // login route
  app.get("/", loginPage);
  app.get("/login", loginPage);
  app.post("/login", loginMethod);

  // logout route
  app.get("/logout", logout);

  // dashboard route
  app.get("/dashboard", dashboard);

  // categories routes
  app.get("/categories", categoryPage);
  app.post("/categories/add", categoryAdd);
  app.get("/categories/del/:id", categoryDelete);
  app.get("/categories/edit/:id", categoryEditPage);
  app.put("/categories/edit/:id", categoryEdit);

  // archives routes
  app.get("/archives", archivePage);
  app.post("/archives/add", uploadArchive.single("archiveFile"), archiveAdd);
  app.get("/archives/del/:id", archiveDelete);
  app.get("/archives/view/:id", archiveView);
  app.get("/archives/edit/:id", archiveEditPage);
  app.put(
    "/archives/edit/:id",
    uploadArchive.single("archiveFile"),
    archiveEdit
  );
  app.get("/archives/category/:categoryId", archiveByCategory)

  // departements routes
  app.get("/departements", departementPage);
  app.post("/departements/add", departementAdd);
  app.get("/departements/del/:id", departementDelete);
  app.get("/departements/edit/:id", departementEditPage);
  app.put("/departements/edit/:id", departementEdit);

  // users routes
  app.get("/users", userPage);
  app.post("/users/add", userAdd);
  app.get("/users/del/:id", userDelete);
  app.get("/users/edit/:id", userEditPage);
  app.put("/users/edit/:id", userEdit);

  // page not found route
  app.use(notFound);
};
