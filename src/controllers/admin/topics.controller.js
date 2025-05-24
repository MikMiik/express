exports.index = async (req, res) => {
  res.render("admin/topics/index");
};

exports.show = async (req, res) => {
  res.render("admin/topics/show");
};
