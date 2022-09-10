module.exports = (req, res) => {
  res.render("not-found", {
    title: "404 Page Not Found",
    layout: "layout/blank-layout",
  });
  res.end();
};
