const { faker } = require("@faker-js/faker");
const slugify = require("slugify");
const bcrypt = require("bcrypt");
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "tyhh_db",
  },
});

/**
 * Seeds the users table with 100 random users
 */
async function seedUsers() {
  try {
    // Clear existing data
    await knex("users").del();

    console.log("Seeding 100 users...");

    // Define relationship statuses
    const relationshipStatuses = [
      "Single",
      "In a relationship",
      "Engaged",
      "Married",
      "Divorced",
      "Widowed",
      "It's complicated",
    ];

    // Generate and insert 100 users
    const users = [];
    const existingUsernames = new Set();
    const existingEmails = new Set();
    const existingPhones = new Set();

    for (let i = 0; i < 100; i++) {
      const gender = faker.helpers.arrayElement(["male", "female", "other"]);
      const name = faker.person.fullName({
        sex: gender !== "other" ? gender : undefined,
      });

      // Create unique username
      let baseUsername = slugify(name, { lower: true, strict: true });
      let username = baseUsername;
      let counter = 1;

      while (existingUsernames.has(username)) {
        username = `${baseUsername}${counter}`;
        counter++;
      }
      existingUsernames.add(username);

      // Create unique email
      let email = `${slugify(name, {
        lower: true,
        replacement: ".",
      })}@${faker.internet.domainName()}`;
      while (existingEmails.has(email)) {
        email = `${slugify(name, {
          lower: true,
          replacement: ".",
        })}${faker.number.int(999)}@${faker.internet.domainName()}`;
      }
      existingEmails.add(email);

      // Create unique phone
      let phone = faker.phone.number();
      while (existingPhones.has(phone)) {
        phone = faker.phone.number();
      }
      existingPhones.add(phone);

      // Birthday between 18-80 years ago
      const birthday = faker.date.birthdate({
        min: 18,
        max: 80,
        mode: "age",
      });

      // Create timestamps
      const createdAt = faker.date.between({
        from: "2022-01-01",
        to: new Date(),
      });
      const updatedAt = faker.date.between({ from: createdAt, to: new Date() });

      // Randomly block 10% of users
      const blockedAt = faker.datatype.boolean(10)
        ? faker.date.between({ from: "2023-01-01", to: new Date() })
        : null;

      // Hash password
      const hashedPassword = await bcrypt.hash("password", 10);

      users.push({
        name,
        email,
        password: hashedPassword,
        username,
        birthday: birthday.toISOString().split("T")[0], // Format as YYYY-MM-DD
        avatar: `https://i.pravatar.cc/150?u=${email}`,
        phone,
        gender,
        rel_status: faker.helpers.arrayElement(relationshipStatuses),
        bio: faker.lorem.paragraph().substring(0, 190),
        address: faker.location.streetAddress({ useFullAddress: true }),
        blocked_at: blockedAt,
        created_at: createdAt,
        updated_at: updatedAt,
      });
    }

    // Insert users in batches
    const batchSize = 10;
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      await knex("users").insert(batch);
      console.log(
        `Inserted users ${i + 1} to ${Math.min(i + batchSize, users.length)}`
      );
    }

    console.log("✅ Successfully seeded 100 users");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    // Close database connection
    await knex.destroy();
  }
}

// Run the seeder
seedUsers();
