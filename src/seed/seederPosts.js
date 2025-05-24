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

    // Array of sample post images
    const postImages = [
      "https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1535551951406-a19828b0a76b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    ];

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

      // Select a random post image (90% chance of having an image)
      const hasImage = faker.datatype.boolean(90);
      const postImg = hasImage ? faker.helpers.arrayElement(postImages) : null;

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
        post_img: postImg,
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
