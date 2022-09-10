module.exports = (req, res) => {
  if (req.session.isLogin) {
    req.session.isLogin = false;
    req.session.username = undefined;
    req.session.departement = undefined;
    req.flash("msg", "Anda telah logout!");
    res.redirect("/");
    res.end();
  } else {
    req.flash("msg", "Logout gagal. Anda belum login sebelumnya!");
    res.redirect("/");
    res.end();
  }
};
