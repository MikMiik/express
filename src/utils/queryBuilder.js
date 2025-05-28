const slugify = require("slugify");

exports.buildInsertQuery = (data) => {
  const title = data.title || data.description || "";
  const slug = title ? slugify(title, { lower: true, strict: true }) : null;
  const finalData = slug ? { ...data, slug } : { ...data };
  const fields = Object.keys(finalData);
  // tạo 1 mảng gồm các keys
  const columns = fields.map((field) => `\`${field}\``).join(", ");
  // đưa mảng keys về chuỗi các `keys` và ngăn cách bởi dấu phẩy
  const placeholders = fields.map(() => "?").join(", ");
  // đưa mảng keys về chuỗi các dấu ? và ngăn cách bởi dấu phẩy
  const values = fields.map((field) => finalData[field]);
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
  const title = data.title || data.description || "";
  const slug = title ? slugify(title, { lower: true, strict: true }) : null;
  const finalData = slug ? { ...data, slug } : { ...data };
  const fields = Object.keys(finalData);
  const setClause = fields.map((field) => `\`${field}\` = ?`).join(", ");
  const values = fields.map((field) => finalData[field]);

  return { setClause, values };
};
/*
VD:
    const data = {
      name: "Nguyễn Văn A",
      email: "a@example.com",
      age: 25,
      is_active: true
    };
    const { setClause, values } = buildUpdateQuery(data);
    Result:
    {
      setClause: '`name` = ?, `email` = ?, `age` = ?, `is_active`= ?',
      values: ['Nguyễn Văn A', 'a@example.com', 25, true]
    }
*/
