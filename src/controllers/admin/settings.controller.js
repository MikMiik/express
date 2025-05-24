exports.index = async (req, res) => {
  res.render("admin/settings/index");
};

exports.show = async (req, res) => {
  res.render("admin/settings/show");
};
