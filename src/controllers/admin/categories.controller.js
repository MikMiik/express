exports.index = async (req, res) => {
  res.render("admin/categories/index");
};

exports.show = async (req, res) => {
  res.render("admin/categories/show");
};
