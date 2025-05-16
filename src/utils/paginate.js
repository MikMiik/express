exports.paginate = async (findAll = async () => {}, page, limit) => {
  page = page <= 0 ? 1 : page;
  limit = limit <= 0 ? 10 : limit;
  const offset = (page - 1) * 10;
  const data = await findAll(+limit, offset);
  return {
    data,
    pagination: (items_count) => {
      return {
        pagination: {
          current_page: +page,
          per_page: +limit,
          total_items: items_count,
          total_page: Math.ceil(items_count / limit),
        },
      };
    },
  };
};
