const { category } = require("../models");

exports.categoryPage = (req, res) => {
  if (req.session.isLogin) {
    category
      .findAll()
      .then((results) => {
        const failed = req.flash("failed");
        const success = req.flash("success");
        res.render("category", {
          isLogin: req.session.isLogin,
          username: req.session.username,
          level: req.session.level,
          failed,
          success,
          results,
          title: "Kategori ",
          layout: "layout/main-layout",
        });
        res.end();
      })
      .catch((err) => {
        console.log(err.message);
        res.end();
      });
  } else {
    const failed = req.flash("failed");
    const success = req.flash("success");
    res.render("category", {
      isLogin: req.session.isLogin,
      username: undefined,
      level: undefined,
      failed,
      success,
      results: undefined,
      title: "Kategori ",
      layout: "layout/main-layout",
    });
    res.end();
  }
};

exports.categoryDelete = (req, res) => {
  const id = req.params.id;

  if (req.session.isLogin && req.session.level === "admin") {
    category
      .destroy({
        where: { id: id },
      })
      .then((result) => {
        if (result === 1) {
          req.flash("success", "Berhasil menghapus kategori");
          res.redirect("/categories");
          res.end();
        } else {
          req.flash(
            "failed",
            "Gagal menghapus. Kategori tidak ditemukan / belum ditambahkan"
          );
          res.redirect("/categories");
          res.end();
        }
      })
      .catch((err) => {
        console.log(err.message);
        req.flash(
          "failed",
          "Terjadi kesalahan pada server. Gagal menghapus kategori!"
        );
        res.redirect("/categories");
        res.end();
      });
  } else {
    req.flash(
      "failed",
      "Halaman khusus admin! anda tidak dapat menghapus kategori"
    );
    res.redirect("/categories");
    res.end();
  }
};

exports.categoryAdd = (req, res) => {
  if (req.session.isLogin) {
    const categoryData = req.body.category;
    if (categoryData && categoryData.trim() !== "") {
      category
        .create({
          name: categoryData,
        })
        .then(() => {
          req.flash("success", "Berhasil menambahkan kategori");
          res.redirect("/categories");
          res.end();
        })
        .catch((err) => {
          console.log(err.message);
          req.flash(
            "failed",
            "Terjadi kesalahan pada server. Gagal menambahkan kategori!"
          );
          res.redirect("/categories");
          res.end();
        });
    } else {
      req.flash(
        "failed",
        "Gagal menambahkan. Field kategori tidak boleh kosong!"
      );
      res.redirect("/categories");
      res.end();
    }
  } else {
    res.redirect("/categories");
    res.end();
  }
};

exports.categoryEditPage = (req, res) => {
  if (req.session.isLogin) {
    const id = req.params.id;
    category
      .findOne({
        where: { id: id },
      })
      .then((result) => {
        if (result !== null) {
          res.render("category-edit", {
            isLogin: req.session.isLogin,
            username: req.session.username,
            level: req.session.level,
            result,
            title: "Edit Kategori ",
            layout: "layout/main-layout",
          });
          res.end();
        } else {
          req.flash(
            "failed",
            "Gagal mengubah!. Kategori tidak ditemukan / belum ditambahkan"
          );
          res.redirect("/categories");
          res.end();
        }
      })
      .catch((err) => {
        console.log(err.message);
        req.flash(
          "failed",
          "Terjadi kesalahan pada server. Gagal mengubah kategori!"
        );
        res.redirect("/categories");
        res.end();
      });
  } else {
    res.redirect("/categories");
    res.end();
  }
};

exports.categoryEdit = (req, res) => {
  if (req.session.isLogin) {
    const id = req.params.id;
    const categoryData = req.body.category;

    if (categoryData && categoryData.trim() !== "") {
      category
        .update(
          {
            name: categoryData,
          },
          {
            where: { id: id },
          }
        )
        .then(() => {
          req.flash("success", "Berhasil mengubah kategori");
          res.redirect("/categories");
          res.end();
        })
        .catch((err) => {
          console.log(err.message);
          req.flash(
            "failed",
            "Terjadi kesalahan pada server. Gagal mengubah kategori!"
          );
          res.redirect("/categories");
          res.end();
        });
    } else {
      req.flash("failed", "Gagal mengubah. Field kategori tidak boleh kosong!");
      res.redirect("/categories");
      res.end();
    }
  } else {
    res.redirect("/categories");
    res.end();
  }
};
