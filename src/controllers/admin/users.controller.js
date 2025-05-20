const dayjs = require("dayjs");

const usersService = require("@/services/users.service");

exports.index = async (req, res) => {
  const { users } = await usersService.getAll(req.query);
  console.log(users);
  res.render("admin/users/index", {
    users,
  });
};

exports.show = async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res.render("admin/users/show", {
    user,
    birthday: dayjs(user.birthday).format("DD/MM/YYYY"),
  });
};
