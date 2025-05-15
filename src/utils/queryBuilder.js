exports.buildInsertQuery = (data) => {
  const fields = Object.keys(data);
  // tạo 1 mảng gồm các keys
  const columns = fields.map((field) => `\`${field}\``).join(", ");
  // đưa mảng keys về chuỗi các `keys` và ngăn cách bởi dấu phẩy
  const placeholders = fields.map(() => "?").join(", ");
  // đưa mảng keys về chuỗi các dấu ? và ngăn cách bởi dấu phẩy
  const values = fields.map((field) => data[field]);
  // mảng các value của mỗi field

  return { columns, placeholders, values };
};

/*
VD:
    const data = {
        name: "Nguyễn Văn A",
        email: "a@example.com",
        age: 25,
        is_active: true
    };
    const { columns, placeholders, values } = buildInsertQuery(data);
    Result:
    {
        columns: '`name`, `email`, `age`, `is_active`',
        placeholders: '?, ?, ?, ?',
        values: ['Nguyễn Văn A', 'a@example.com', 25, true]
    }
*/
exports.buildUpdateQuery = (data) => {
  const fields = Object.keys(data);
  const setClause = fields.map((field) => `\`${field}\` = ?`).join(", ");
  const values = fields.map((field) => data[field]);

  return { setClause, values };
};
