const { faker } = require("@faker-js/faker");
const slugify = require("slugify");
const bcrypt = require("bcrypt");

// Cấu hình faker cho tiếng Việt (tùy chọn)
faker.locale = "vi";

// Hàm tạo slug từ tên
function createUsernameSlug(name) {
  return slugify(name, {
    lower: true,
    strict: true,
    replacement: "-",
  });
}

// Hàm hash password
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Hàm tạo dữ liệu user giả
async function generateUsers(count = 100) {
  const users = [];
  const usedEmails = new Set();
  const usedPhones = new Set();
  const usedUsernames = new Set();

  const relationshipStatuses = [
    "Single",
    "In a relationship",
    "Engaged",
    "Married",
    "Divorced",
    "Widowed",
    "It's complicated",
  ];

  const statuses = ["active", "inactive", "pending", "suspended"];

  for (let i = 0; i < count; i++) {
    let email, phone, username;

    // Đảm bảo email unique
    do {
      email = faker.internet.email();
    } while (usedEmails.has(email));
    usedEmails.add(email);

    // Đảm bảo phone unique
    do {
      phone = faker.phone.number("###-###-####");
    } while (usedPhones.has(phone));
    usedPhones.add(phone);

    const name = faker.person.fullName();

    // Đảm bảo username unique
    do {
      username = createUsernameSlug(name);
      // Thêm số random nếu username đã tồn tại
      if (usedUsernames.has(username)) {
        username = `${username}-${faker.number.int({ min: 1, max: 9999 })}`;
      }
    } while (usedUsernames.has(username));
    usedUsernames.add(username);

    const password = await hashPassword("password123"); // Password mặc định

    const user = {
      name: name,
      email: email,
      password: password,
      role: faker.helpers.arrayElement(["user", "admin", "moderator"]),
      username: username,
      birthday: faker.date.birthdate({ min: 18, max: 80, mode: "age" }),
      avatar: `https://i.pravatar.cc/150?u=${email}`,
      status: faker.helpers.arrayElement(statuses),
      phone: phone,
      gender: faker.helpers.arrayElement(["male", "female", "other"]),
      rel_status: faker.helpers.arrayElement(relationshipStatuses),
      bio: faker.lorem.sentences(3, " "),
      address: faker.location.streetAddress(true),
      blocked_at: faker.datatype.boolean(0.1) ? faker.date.recent() : null, // 10% chance bị block
      created_at: faker.date.between({
        from: "2022-01-01T00:00:00.000Z",
        to: "2025-06-14T00:00:00.000Z",
      }),
      updated_at: faker.date.recent(),
      verified_at: faker.datatype.boolean(0.8) ? faker.date.recent() : null, // 80% chance được verify
    };

    users.push(user);
  }

  return users;
}

// Hàm tạo SQL INSERT statements
function generateInsertSQL(users) {
  const values = users
    .map((user) => {
      const formatDate = (date) =>
        date
          ? `'${date.toISOString().slice(0, 19).replace("T", " ")}'`
          : "NULL";
      const escapeString = (str) =>
        str ? `'${str.replace(/'/g, "''")}'` : "NULL";

      return `(${escapeString(user.name)}, ${escapeString(user.email)}, ${escapeString(user.password)}, ${escapeString(user.role)}, ${escapeString(user.username)}, '${user.birthday.toISOString().slice(0, 10)}', ${escapeString(user.avatar)}, ${escapeString(user.status)}, ${escapeString(user.phone)}, ${escapeString(user.gender)}, ${escapeString(user.rel_status)}, ${escapeString(user.bio)}, ${escapeString(user.address)}, ${formatDate(user.blocked_at)}, ${formatDate(user.created_at)}, ${formatDate(user.updated_at)}, ${formatDate(user.verified_at)})`;
    })
    .join(",\n  ");

  return `INSERT INTO \`users\` (\`name\`, \`email\`, \`password\`, \`role\`, \`username\`, \`birthday\`, \`avatar\`, \`status\`, \`phone\`, \`gender\`, \`rel_status\`, \`bio\`, \`address\`, \`blocked_at\`, \`created_at\`, \`updated_at\`, \`verified_at\`) VALUES\n  ${values};`;
}

// Hàm chính để chạy seeder
async function runSeeder() {
  try {
    console.log("Đang tạo dữ liệu users...");

    const users = await generateUsers(100);

    console.log("Đã tạo xong dữ liệu users!");
    console.log("Tạo SQL INSERT statement...");

    const insertSQL = generateInsertSQL(users);

    // In ra SQL để có thể copy paste
    console.log("\n--- SQL INSERT STATEMENT ---\n");
    console.log(insertSQL);

    // Hoặc ghi vào file
    const fs = require("fs");
    fs.writeFileSync("users_seeder.sql", insertSQL);
    console.log("\nĐã lưu SQL vào file users_seeder.sql");

    return users;
  } catch (error) {
    console.error("Lỗi khi tạo seeder:", error);
  }
}

// Chạy seeder
if (require.main === module) {
  runSeeder();
}

module.exports = {
  generateUsers,
  generateInsertSQL,
  runSeeder,
};
