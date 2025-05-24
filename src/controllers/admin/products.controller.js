exports.index = async (req, res) => {
  res.render("admin/products/index");
};

exports.show = async (req, res) => {
  res.render("admin/products/show");
};
