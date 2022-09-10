const { user, departement, Sequelize } = require("../models");
const bcrypt = require("bcrypt");

exports.userPage = (req, res) => {
  if (req.session.isLogin && req.session.level === "admin") {
    // sequelize
    //   .query(
    //     `SELECT usr.id as id, usr.username as username, usr.email as email, dep.name as departement, usr.level as level
    //     FROM users as usr
    //     JOIN departements as dep
    //     ON usr.departementId = dep.id`
    //   )
    user
      .findAll({
        attributes: ["id", "username", "email", "level"],
        include: "departement",
      })
      .then(async (results) => {
        const failed = req.flash("failed");
        const succes = req.flash("succes");
        const departements = await departement.findAll();
        res.render("user", {
          isLogin: req.session.isLogin,
          username: req.session.username,
          level: req.session.level,
          failed,
          succes,
          results,
          departements,
          title: "User ",
          layout: "layout/main-layout",
        });
        res.end();
      })
      .catch((err) => {
        console.log(err.message);
        res.end();
      });
  } else {
    res.render("user", {
      isLogin: req.session.isLogin,
      username: undefined,
      level: undefined,
      failed: undefined,
      succes: undefined,
      results: [],
      departements: [],
      title: "User ",
      layout: "layout/blank-layout",
    });
    res.end();
  }
};

exports.userDelete = (req, res) => {
  const id = req.params.id;

  if (req.session.isLogin && req.session.level === "admin") {
    user
      .destroy({
        where: { id: id },
      })
      .then((data) => {
        if (data === 1) {
          req.flash("succes", "Berhasil menghapus user");
          res.redirect("/users");
          res.end();
        } else {
          req.flash(
            "failed",
            "Gagal menghapus. User tidak ditemukan / belum ditambahkan"
          );
          res.redirect("/users");
          res.end();
        }
      })
      .catch((err) => {
        console.log(err.message);
        req.flash(
          "failed",
          "Terjadi kesalahan pada server. Gagal menghapus user!"
        );
        res.redirect("/users");
        res.end();
      });
  } else {
    res.redirect("/users");
    res.end();
  }
};

exports.userAdd = (req, res) => {
  if (req.session.isLogin && req.session.level === "admin") {
    if (
      req.body.username &&
      req.body.username.trim() !== "" &&
      req.body.password &&
      req.body.password.trim() !== "" &&
      req.body.level &&
      req.body.departementId
    ) {
      const dataUser = { ...req.body };
      dataUser.password = bcrypt.hashSync(req.body.password.trim(), 10);
      user
        .create(dataUser)
        .then(() => {
          req.flash("succes", "Berhasil menambahkan user");
          res.redirect("/users");
          res.end();
        })
        .catch((err) => {
          console.log(err);
          req.flash(
            "failed",
            "Terjadi kesalahan pada server. Gagal menambahkan user!"
          );
          res.redirect("/users");
          res.end();
        });
    } else {
      req.flash("failed", "Gagal menambahkan user. Semua field harus di isi!");
      res.redirect("/users");
      res.end();
    }
  } else {
    res.redirect("/users");
    res.end();
  }
};

exports.userEditPage = (req, res) => {
  if (req.session.isLogin && req.session.level === "admin") {
    const id = req.params.id;

    user
      .findOne({
        where: { id: id },
        include: "departement",
      })
      .then(async (result) => {
        if (result !== null) {
          const departements = await departement.findAll();

          res.render("user-edit", {
            isLogin: req.session.isLogin,
            username: req.session.username,
            level: req.session.level,
            result,
            departements,
            title: "Edit User ",
            layout: "layout/main-layout",
          });
          res.end();
        } else {
          req.flash(
            "failed",
            "Gagal mengubah!. User tidak ditemukan / belum ditambahkan"
          );
          res.redirect("/users");
          res.end();
        }
      })
      .catch((err) => {
        console.log(err.message);
        req.flash(
          "failed",
          "Terjadi kesalahan pada server. Gagal mengubah user!"
        );
        res.redirect("/users");
        res.end();
      });
  } else {
    res.redirect("/users");
    res.end();
  }
};

exports.userEdit = (req, res) => {
  if (req.session.isLogin && req.session.level === "admin") {
    const id = req.params.id;
    const dataUser = { ...req.body };
    if (dataUser.newPassword.trim() !== "") {
      dataUser.password = bcrypt.hashSync(req.body.newPassword.trim(), 10);
    } else {
      dataUser.password = req.body.oldPassword;
    }

    if (
      dataUser.username &&
      dataUser.username.trim() !== "" &&
      dataUser.level &&
      dataUser.departementId
    ) {
      user
        .update(dataUser, {
          where: { id: id },
        })
        .then(() => {
          req.flash("succes", "Berhasil mengubah user");
          res.redirect("/users");
          res.end();
        })
        .catch((err) => {
          console.log(err.message);
          req.flash(
            "failed",
            "Terjadi kesalahan pada server. Gagal mengubah user!"
          );
          res.redirect("/users");
          res.end();
        });
    } else {
      req.flash("failed", "Gagal mengubah user. Semua field harus di isi!");
      res.redirect("/users");
      res.end();
    }
  } else {
    res.redirect("/users");
    res.end();
  }
};
