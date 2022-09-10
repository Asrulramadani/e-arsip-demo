const { departement } = require("../models");

exports.departementPage = (req, res) => {
  if (req.session.isLogin && req.session.level === "admin") {
    departement
      .findAll()
      .then((results) => {
        const failed = req.flash("failed");
        const success = req.flash("success");
        res.render("departement", {
          isLogin: req.session.isLogin,
          username: req.session.username,
          level: req.session.level,
          failed,
          success,
          results,
          title: "Departemen ",
          layout: "layout/main-layout",
        });
        res.end();
      })
      .catch((err) => {
        console.log(err.message);
        res.end();
      });
  } else {
    res.render("departement", {
      isLogin: req.session.isLogin,
      username: undefined,
      level: undefined,
      failed: undefined,
      success: undefined,
      results: undefined,
      title: "Departemen ",
      layout: "layout/blank-layout",
    });
    res.end();
  }
};

exports.departementDelete = (req, res) => {
  const id = req.params.id;

  if (req.session.isLogin && req.session.level === "admin") {
    departement
      .destroy({
        where: { id: id },
      })
      .then((result) => {
        if (result === 1) {
          req.flash("success", "Berhasil menghapus departemen");
          res.redirect("/departements");
          res.end();
        } else {
          req.flash(
            "failed",
            "Gagal menghapus. Departemen tidak ditemukan / belum ditambahkan"
          );
          res.redirect("/departements");
          res.end();
        }
      })
      .catch((err) => {
        console.log(err.message);
        req.flash(
          "failed",
          "Terjadi kesalahan pada server. Gagal menghapus departemen!"
        );
        res.redirect("/departements");
        res.end();
      });
  } else {
    res.redirect("/departements");
    res.end();
  }
};

exports.departementAdd = (req, res) => {
  if (req.session.isLogin && req.session.level === "admin") {
    const departementData = req.body.departement;
    if (departementData && departementData.trim() !== "") {
      departement
        .create({
          name: departementData,
        })
        .then(() => {
          req.flash("success", "Berhasil menambahkan departemen");
          res.redirect("/departements");
          res.end();
        })
        .catch((err) => {
          console.log(err.message);
          req.flash(
            "failed",
            "Terjadi kesalahan pada server. Gagal menambahkan departemen!"
          );
          res.redirect("/departements");
          res.end();
        });
    } else {
      req.flash(
        "failed",
        "Gagal menambahkan. Field departemen tidak boleh kosong!"
      );
      res.redirect("/departements");
      res.end();
    }
  } else {
    res.redirect("/departements");
    res.end();
  }
};

exports.departementEditPage = (req, res) => {
  if (req.session.isLogin && req.session.level === "admin") {
    const id = req.params.id;

    departement
      .findOne({
        where: { id: id },
      })
      .then((result) => {
        if (result !== null) {
          res.render("departement-edit", {
            isLogin: req.session.isLogin,
            username: req.session.username,
            level: req.session.level,
            result,
            title: "Edit Departemen ",
            layout: "layout/main-layout",
          });
          res.end();
        } else {
          req.flash(
            "failed",
            "Gagal mengubah!. Departemen tidak ditemukan / belum ditambahkan"
          );
          res.redirect("/departements");
          res.end();
        }
      })
      .catch((err) => {
        console.log(err.message);
        req.flash(
          "failed",
          "Terjadi kesalahan pada server. Gagal mengubah departemen!"
        );
        res.redirect("/departements");
        res.end();
      });
  } else {
    res.redirect("/departements");
    res.end();
  }
};

exports.departementEdit = (req, res) => {
  if (req.session.isLogin && req.session.level === "admin") {
    const id = req.params.id;
    const departementData = req.body.departement;

    if (departementData && departementData.trim() !== "") {
      departement
        .update(
          {
            name: departementData,
          },
          {
            where: { id: id },
          }
        )
        .then(() => {
          req.flash("success", "Berhasil mengubah departemen");
          res.redirect("/departements");
          res.end();
        })
        .catch((err) => {
          console.log(err.message);
          req.flash(
            "failed",
            "Terjadi kesalahan pada server. Gagal mengubah departemen!"
          );
          res.redirect("/departements");
          res.end();
        });
    } else {
      req.flash(
        "failed",
        "Gagal mengubah. Field departemen tidak boleh kosong!"
      );
      res.redirect("/departements");
      res.end();
    }
  } else {
    res.redirect("/departements");
    res.end();
  }
};
