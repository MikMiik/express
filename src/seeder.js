require("module-alias/register");
const db = require("@/configs/db");
const { faker } = require("@faker-js/faker");
const slugify = require("slugify");

async function run() {
  try {
    console.log("Starting posts seeder...");

    // Get all user IDs to randomly assign posts to users
    const [usersResult] = await db.query("SELECT id FROM users");
    if (!usersResult.length) {
      console.error("No users found in database. Please seed users first.");
      return;
    }
    const userIds = usersResult.map((user) => user.id);

    // Prepare bulk insert
    const records = 200;
    let values = [];
    let placeholders = [];

    for (let i = 0; i < records; i++) {
      // Generate a title
      const title = faker.lorem
        .sentence(Math.floor(Math.random() * 5) + 3)
        .replace(/\.$/, "");

      // Create a unique slug
      const baseSlug = slugify(title, {
        lower: true,
        strict: true,
      });
      const slug = `${baseSlug}-${faker.string.alphanumeric(6)}`;

      // Generate random user ID
      const randomUserIndex = Math.floor(Math.random() * userIds.length);
      const userId = userIds[randomUserIndex];

      // Generate random content and description
      const description =
        Math.random() > 0.2
          ? faker.lorem.paragraph(Math.floor(Math.random() * 3) + 1)
          : null;
      const content = faker.lorem.paragraphs(
        Math.floor(Math.random() * 8) + 3,
        "<br/>\n"
      );

      // Generate random price (null for 30% of posts)
      const price =
        Math.random() > 0.3
          ? parseFloat((Math.random() * 1000).toFixed(3))
          : null;

      // Random active status (70% active)
      const isActive = Math.random() > 0.3 ? 1 : 0;

      // Random published date (80% are published)
      const publishedAt =
        Math.random() > 0.2
          ? faker.date.between({
              from: "2023-01-01T00:00:00.000Z",
              to: "2025-05-13T00:00:00.000Z",
            })
          : null;

      // Set created and updated dates
      const createdAt = faker.date.between({
        from: "2022-01-01T00:00:00.000Z",
        to: "2025-05-13T00:00:00.000Z",
      });

      // Updated date is either same as created or later
      const updatedAt =
        Math.random() > 0.7
          ? faker.date.between({
              from: createdAt,
              to: "2025-05-13T00:00:00.000Z",
            })
          : createdAt;

      // Add to values array
      values.push(
        userId,
        title,
        slug,
        description,
        content,
        price,
        publishedAt ? formatDate(publishedAt) : null,
        formatDate(createdAt),
        formatDate(updatedAt)
      );

      // Add placeholder for prepared statement
      placeholders.push("(?, ?, ?, ?, ?, ?, ?, ?, ?)");
    }

    // Execute bulk insert
    const query = `
      INSERT INTO posts (
        user_id, title, slug, description, content, 
        price, published_at, created_at, updated_at
      ) 
      VALUES ${placeholders.join(", ")}
    `;

    const result = await db.query(query, values);
    console.log(`Successfully seeded ${result.affectedRows} posts`);
  } catch (error) {
    console.error("Error seeding posts:", error);
  } finally {
    // Close database connection if needed
    process.exit(0);
  }
}

// Helper function to format date for MySQL
function formatDate(date) {
  return date ? date.toISOString().slice(0, 19).replace("T", " ") : null;
}

run();
