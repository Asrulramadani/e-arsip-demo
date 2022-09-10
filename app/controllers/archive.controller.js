const { archive, category, departement } = require("../models");
const { Op } = require("sequelize");
const { generateRandomArchiveNumber, deleteFile } = require("../utils");

exports.archivePage = (req, res) => {
  if (req.session.isLogin) {
    let condition;
    if (req.session.level === "admin") {
      condition = {};
    } else {
      condition = {
        [Op.or]: [
          { departementId: req.session.departementId },
          { departementId: null },
        ],
      };
    }

    archive
      .findAll({
        where: condition,
        attributes: [
          "id",
          "name",
          "number",
          "createdAt",
          "updatedAt",
          "file_size",
        ],
        include: ["user", "category", "departement"],
      })
      .then(async (results) => {
        const failed = req.flash("failed");
        const success = req.flash("success");
        const categories = await category.findAll();
        const archiveNumber = generateRandomArchiveNumber();
        res.render("archive", {
          isLogin: req.session.isLogin,
          username: req.session.username,
          level: req.session.level,
          failed,
          success,
          results,
          categories,
          archiveNumber,
          title: "Arsip ",
          layout: "layout/main-layout"
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
    res.render("archive", {
      isLogin: undefined,
      username: undefined,
      level: undefined,
      failed,
      success,
      results: [],
      categories: [],
      archiveNumber: undefined,
      title: "Archive ",
      layout: "layout/main-layout"
    });
    res.end();
  }
};

exports.archiveDelete = async (req, res) => {
  const id = req.params.id;

  if (req.session.isLogin) {
    let result = await archive.findOne({
      where: { id: id },
    });

    if (result != null) {
      deleteFile(result.file_name);
      archive
        .destroy({
          where: { id: id },
        })
        .then((data) => {
          if (data === 1) {
            req.flash("success", "Berhasil menghapus arsip");
            res.redirect("/archives");
            res.end();
          } else {
            req.flash(
              "failed",
              "Gagal menghapus. Arsip tidak ditemukan / belum ditambahkan"
            );
            res.redirect("/archives");
            res.end();
          }
        })
        .catch((err) => {
          console.log(err.message);
          req.flash(
            "failed",
            "Terjadi kesalahan pada server. Gagal menghapus Arsip!"
          );
          res.redirect("/archives");
          res.end();
        });
    } else {
      req.flash(
        "failed",
        "Gagal menghapus. Arsip tidak ditemukan / belum ditambahkan"
      );
      res.redirect("/archives");
      res.end();
    }
  } else {
    res.redirect("/archives");
    res.end();
  }
};

exports.archiveAdd = async (req, res) => {
  if (req.session.isLogin) {
    if (!req.fileValidationError) {
      if (
        req.body.number &&
        req.body.number.trim() !== "" &&
        req.body.name &&
        req.body.name.trim() !== "" &&
        req.body.categoryId &&
        req.body.desc &&
        req.body.desc.trim() !== ""
      ) {
        const dataArchive = { ...req.body };

        dataArchive.userId = req.session.userId;
        dataArchive.departementId = req.session.departementId;
        dataArchive.file_name = req.file.filename;
        dataArchive.file_size = (req.file.size / 1024 ** 2).toFixed(2);

        archive
          .create(dataArchive)
          .then(() => {
            req.flash("success", "Berhasil menambahkan arsip");
            res.redirect("/archives");
            res.end();
          })
          .catch((err) => {
            console.log(err.message);
            req.flash(
              "failed",
              "Terjadi kesalahan pada server. Gagal menambahkan arsip!"
            );
            res.redirect("/archives");
            res.end();
          });
      } else {
        req.flash(
          "failed",
          "Gagal menambahkan arsip. Semua field harus di isi!"
        );
        res.redirect("/archives");
        res.end();
      }
    } else {
      req.flash("failed", "Gagal menambahkan arsip. File harus berformat pdf!");
      res.redirect("/archives");
      res.end();
    }
  } else {
    res.redirect("/archives");
    res.end();
  }
};

exports.archiveView = (req, res) => {
  if (req.session.isLogin) {
    const { id } = req.params;
    archive
      .findOne({ where: { id }, include: ["user", "departement", "category"] })
      .then(async (result) => {
        if (result !== null) {
          res.render("archive-view", {
            isLogin: req.session.isLogin,
            username: req.session.username,
            level: req.session.level,
            result,
            title: "Detail Arsip ",
            layout: "layout/main-layout"
          });
          res.end();
        } else {
          req.flash(
            "failed",
            "Gagal melihat detail!. Arsip tidak ditemukan / belum ditambahkan"
          );
          res.redirect("/archives");
          res.end();
        }
      })
      .catch((err) => {
        console.log(err.message);
        req.flash(
          "failed",
          "Terjadi kesalahan pada server. Gagal melihat detail Arsip!"
        );
        res.redirect("/archives");
        res.end();
      });
  } else {
    res.redirect("/archives");
    res.end();
  }
};

exports.archiveByCategory = async (req, res) => {
  if (req.session.isLogin) {
    const { categoryId } = req.params;

    const resultCategory = await category.findOne({ where: { id: categoryId } });
    if (resultCategory === null) {
      req.flash("failed", "Kategori tidak ditemukan!");
      res.redirect("/archives");
      res.end();
    }

    let condition;
    if (req.session.level === "admin") {
      condition = { categoryId };
    } else {
      condition = {
        [Op.and]: [
          { departementId: req.session.departementId },
          { categoryId },
        ],
      };
    }

    archive
      .findAll({
        where: condition,
        attributes: [
          "id",
          "name",
          "number",
          "createdAt",
          "updatedAt",
          "file_size",
        ],
        include: ["user", "category", "departement"],
      })
      .then(async (results) => {
        const failed = req.flash("failed");
        const success = req.flash("success");
        const categories = await category.findAll();
        const archiveNumber = generateRandomArchiveNumber();
        res.render("archive", {
          isLogin: req.session.isLogin,
          username: req.session.username,
          level: req.session.level,
          failed,
          success,
          results,
          categories,
          archiveNumber,
          title: `Arsip | kategori ${resultCategory.name}`,
          layout: "layout/main-layout"
        });
        res.end();
      })
      .catch((err) => {
        console.log(err.message);
        res.end();
      });
  } else {
    res.redirect("/archives")
    res.end();
  }
};

exports.archiveEditPage = (req, res) => {
  if (req.session.isLogin) {
    const id = req.params.id;

    archive
      .findOne({
        where: { id: id },
      })
      .then(async (result) => {
        if (result !== null) {
          const categories = await category.findAll();
          const departements = await departement.findAll();
          res.render("archive-edit", {
            isLogin: req.session.isLogin,
            username: req.session.username,
            level: req.session.level,
            result,
            categories,
            departements,
            title: "Edit Arsip ",
            layout: "layout/main-layout"
          });
          res.end();
        } else {
          req.flash(
            "failed",
            "Gagal mengubah!. Arsip tidak ditemukan / belum ditambahkan"
          );
          res.redirect("/archives");
          res.end();
        }
      })
      .catch((err) => {
        console.log(err.message);
        req.flash(
          "failed",
          "Terjadi kesalahan pada server. Gagal mengubah Arsip!"
        );
        res.redirect("/archives");
        res.end();
      });
  } else {
    res.redirect("/archives");
    res.end();
  }
};

exports.archiveEdit = (req, res) => {
  if (req.session.isLogin) {
    const id = req.params.id;
    const dataArchive = { ...req.body };

    if (req.file) {
      dataArchive.file_name = req.file.filename;
      dataArchive.file_size = (req.file.size / 1024 ** 2).toFixed(2);

      deleteFile(dataArchive.oldFileName);
    }

    if (
      dataArchive.name &&
      dataArchive.name.trim() !== "" &&
      dataArchive.categoryId &&
      dataArchive.departementId &&
      dataArchive.desc &&
      dataArchive.desc.trim() !== ""
    ) {
      archive
        .update(dataArchive, {
          where: { id: id },
        })
        .then(() => {
          req.flash("success", "Berhasil mengubah archive");
          res.redirect("/archives");
          res.end();
        })
        .catch((err) => {
          console.log(err.message);
          req.flash(
            "failed",
            "Terjadi kesalahan pada server. Gagal mengubah archive!"
          );
          res.redirect("/archives");
          res.end();
        });
    } else {
      req.flash("failed", "Gagal mengubah archive. Semua field harus di isi!");
      res.redirect("/archives");
      res.end();
    }
  } else {
    res.redirect("/archives");
    res.end();
  }
};
