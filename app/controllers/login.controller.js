const { user } = require("../models");
const bcrypt = require("bcrypt");

exports.loginPage = (req, res) => {
  if (req.session.isLogin) {
    res.redirect("/dashboard");
    res.end();
  } else {
    const msg = req.flash("msg");
    res.render("login", { title: "Login", msg, layout: "layout/blank-layout" });
    res.end();
  }
};

exports.loginMethod = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    user
      .findOne({
        where: {
          username,
        },
      })
      .then((data) => {
        if (data) {
          const isPasswordValid = bcrypt.compareSync(password, data.password);

          if (isPasswordValid) {
            req.session.isLogin = true;
            req.session.username = data.username;
            req.session.userId = data.id;
            req.session.departementId = data.departementId;
            req.session.level = data.level;
            res.redirect("/dashboard");
            res.end();
          } else {
            req.flash("msg", "Password yang anda masukkan salah!");
            res.redirect("/");
            res.end();
          }
        } else {
          req.flash("msg", "Username tidak ditemukan");
          res.redirect("/");
          res.end();
        }
      })
      .catch((err) => {
        console.log(err.message);
        req.flash("msg", `Error: terjadi kesalahan pada server`);
        res.redirect("/");
        res.end();
      });
  } else {
    req.flash("msg", "Username dan Password tidak boleh kosong");
    res.redirect("/");
    res.end();
  }
};
