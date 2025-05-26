const dayjs = require("dayjs");

function formatDate(date) {
  return dayjs(date).format("DD/MM/YYYY");
}

function formatDay(day) {
  return dayjs(day).format("dddd, HH:mm A");
}

module.exports = { formatDate, formatDay };
