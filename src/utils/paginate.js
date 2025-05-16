const throwError = require("./throwError");

exports.paginate = async (
  findAll = async () => {},
  page = 10,
  limit = 10,
  itemsName = "items"
) => {
  page = page <= 0 ? 1 : page;
  limit = limit <= 0 ? 10 : limit;

  if (typeof itemsName !== "string") {
    throwError(400, "Validation failed for parameter 'itemsName'", {
      parameter: "itemsName",
      expected_type: "string",
      location: "paginate function",
    });
  }

  const total_items =
    itemsName !== "items" ? `total_${itemsName}` : "total_items";
  const offset = (page - 1) * 10;
  const { rows, count } = await findAll(+limit, offset);

  return {
    [itemsName]: rows,
    pagination: {
      current_page: +page,
      per_page: +limit,
      [total_items]: count,
      total_page: Math.ceil(count / limit),
    },
  };
};
