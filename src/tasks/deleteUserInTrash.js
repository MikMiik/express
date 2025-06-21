const usersService = require("@/services/users.service");
const dayjs = require("dayjs");

async function deleteUserInTrash() {
  const currentDate = dayjs();
  const users = await usersService.getSoftDeleteUsers();
  users.forEach((user) => {
    const deleted_at = dayjs(user.deleted_at);
    const differ = currentDate.diff(deleted_at, "day");
    if (differ >= 30) {
      usersService.remove(user.id);
      console.log(`Deleted user: ${user.id}: ${user.name}`);
    }
  });
}

module.exports = deleteUserInTrash;
