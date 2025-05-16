const throwError = require("./throwError");

exports.paginate = async (findAll = async () => {}, page, limit, itemsName) => {
  page = page <= 0 ? 1 : page;
  limit = limit <= 0 ? 10 : limit;
  if (itemsName && typeof itemsName !== "string") {
    throwError(400, "Validation failed for parameter 'itemsName'", {
      parameter: "itemsName",
      expected_type: "string",
      location: "paginate function",
    });
  }
  const items = itemsName ? itemsName : "items";
  const total_items = itemsName ? `total_${itemsName}` : "total_items";
  const offset = (page - 1) * 10;
  const { rows, count } = await findAll(+limit, offset);
  return {
    [items]: rows,
    pagination: {
      current_page: +page,
      per_page: +limit,
      [total_items]: count,
      total_page: Math.ceil(count / limit),
    },
  };
};
