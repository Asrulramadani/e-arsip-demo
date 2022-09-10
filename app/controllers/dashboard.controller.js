const {
  user,
  category,
  departement,
  archive,
  sequelize,
} = require("../models");

const {Op} = require("sequelize")

module.exports = async (req, res) => {
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

    const [
      {
        dataValues: { userTotal },
      },
    ] = await user.findAll({
      attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "userTotal"]],
    });
    const [
      {
        dataValues: { categoryTotal },
      },
    ] = await category.findAll({
      attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "categoryTotal"]],
    });
    const [
      {
        dataValues: { departementTotal },
      },
    ] = await departement.findAll({
      attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "departementTotal"]],
    });
    const [
      {
        dataValues: { archiveTotal },
      },
    ] = await archive.findAll({
      where: condition,
      attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "archiveTotal"]],
    });

    res.render("dashboard", {
      isLogin: req.session.isLogin,
      username: req.session.username,
      level: req.session.level,
      data: {
        userTotal,
        categoryTotal,
        departementTotal,
        archiveTotal,
      },
      title: "Dashboard ",
      layout: "layout/main-layout",
    });
    res.end();
  } else {
    res.render("dashboard", {
      isLogin: false,
      username: undefined,
      level: undefined,
      data: {},
      title: "Dashboard ",
      layout: "layout/main-layout",
    });
    res.end();
  }
};
