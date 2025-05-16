const { faker } = require("@faker-js/faker");
const slugify = require("slugify");
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
 * Seeds the posts table with 100 random posts
 */
async function seedPosts() {
  try {
    console.log("Starting posts seeding process...");

    // First, check if there are users available
    const userCount = await knex("users").count("id as count").first();
    if (!userCount || userCount.count === 0) {
      throw new Error(
        "No users found in the database. Please seed users first."
      );
    }

    console.log(`Found ${userCount.count} users.`);

    // Get all user IDs
    const users = await knex("users").select("id");
    const userIds = users.map((user) => user.id);

    console.log("Generating 100 random posts...");

    const posts = [];
    const existingSlugs = new Set();

    for (let i = 0; i < 100; i++) {
      // Select a random user
      const userId = faker.helpers.arrayElement(userIds);

      // Generate post title and create a unique slug from it
      const title = faker.helpers.arrayElement([
        faker.lorem.sentence(),
        `${faker.word.words(3)} - ${faker.word.words(2)}`,
        `${faker.company.catchPhrase()}`,
        `${faker.word.adjective()} ${faker.word.noun()} ${faker.word.verb()}`,
        `The ${faker.word.adjective()} ${faker.word.noun()}`,
        `${faker.number.int(10)} ${faker.word.words(3)}`,
        `${faker.person.firstName()}'s ${faker.word.noun()}`,
        `How to ${faker.word.verb()} ${faker.word.noun()}`,
        `Why ${faker.word.words(4)}?`,
      ]);

      // Create a base slug and ensure it's unique
      let baseSlug = slugify(title, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g, // Remove special characters
      });

      // Trim the slug if it's too long (under 191 chars as per your schema)
      if (baseSlug.length > 180) {
        baseSlug = baseSlug.substring(0, 180);
      }

      let slug = baseSlug;
      let counter = 1;

      // Ensure slug uniqueness
      while (existingSlugs.has(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      existingSlugs.add(slug);

      // Generate creation date within the last 2 years
      const createdAt = faker.date.between({
        from: "2023-05-15T00:00:00.000Z",
        to: "2025-05-15T00:00:00.000Z",
      });

      // 85% of posts are published
      const isPublished = faker.datatype.boolean(85);

      // Published date is between created date and now (only for published posts)
      const publishedAt = isPublished
        ? faker.date.between({
            from: createdAt,
            to: "2025-05-15T00:00:00.000Z",
          })
        : null;

      // Updated date is either the same as created or later
      const updatedAt = faker.datatype.boolean(30)
        ? faker.date.between({
            from: createdAt,
            to: "2025-05-15T00:00:00.000Z",
          })
        : createdAt;

      // Generate short description (sometimes null)
      const hasDescription = faker.datatype.boolean(80);
      const description = hasDescription ? faker.lorem.paragraph(2) : null;

      // Generate post content (with different formats and lengths)
      const paragraphCount = faker.number.int({ min: 2, max: 8 });
      const paragraphs = [];

      for (let j = 0; j < paragraphCount; j++) {
        // Add headers occasionally
        if (j > 0 && faker.datatype.boolean(30)) {
          paragraphs.push(`## ${faker.lorem.sentence(4)}`);
        }

        // Add normal paragraphs
        paragraphs.push(
          faker.lorem.paragraph(faker.number.int({ min: 3, max: 8 }))
        );

        // Add lists occasionally
        if (faker.datatype.boolean(20)) {
          const listItems = faker.number.int({ min: 3, max: 6 });
          for (let k = 0; k < listItems; k++) {
            paragraphs.push(`- ${faker.lorem.sentence()}`);
          }
        }

        // Add a blockquote occasionally
        if (faker.datatype.boolean(15)) {
          paragraphs.push(`> ${faker.lorem.sentence()}`);
        }
      }

      const content = paragraphs.join("\n\n");

      posts.push({
        user_id: userId,
        title,
        slug,
        description,
        content,
        published_at: publishedAt,
        created_at: createdAt,
        updated_at: updatedAt,
      });
    }

    // Delete existing posts (optional)
    console.log("Clearing existing posts...");
    await knex("posts").del();

    // Insert posts in batches
    const batchSize = 20;
    for (let i = 0; i < posts.length; i += batchSize) {
      const batch = posts.slice(i, i + batchSize);
      await knex("posts").insert(batch);
      console.log(
        `Inserted posts ${i + 1} to ${Math.min(i + batchSize, posts.length)}`
      );
    }

    console.log("✅ Successfully seeded 100 posts");
  } catch (error) {
    console.error("Error seeding posts:", error);
    console.error(error.stack);
  } finally {
    // Close database connection
    await knex.destroy();
  }
}

// Run the seeder
seedPosts();
