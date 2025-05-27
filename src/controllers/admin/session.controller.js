const usersService = require("@/services/users.service");
const { formatDate, formatDay } = require("@/utils/dayjsFormat");

exports.show = async (req, res) => {
  user = await usersService.getById(req.params.id);
};
