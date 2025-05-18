const { faker } = require("@faker-js/faker");
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
 * Seeds the comments table with 300 random comments,
 * ensuring every user and every post has at least 2 comments
 * and adds parent_id for nested comments (replies)
 */
async function seedComments() {
  try {
    console.log("Starting comments seeding process...");

    // First, check if there are users and posts available
    const userCount = await knex("users").count("id as count").first();
    if (!userCount || userCount.count === 0) {
      throw new Error(
        "No users found in the database. Please seed users first."
      );
    }

    const postCount = await knex("posts").count("id as count").first();
    if (!postCount || postCount.count === 0) {
      throw new Error(
        "No posts found in the database. Please seed posts first."
      );
    }

    console.log(`Found ${userCount.count} users and ${postCount.count} posts.`);

    // Get all user IDs and post IDs
    const users = await knex("users").select("id");
    const posts = await knex("posts").select(["id", "published_at", "user_id"]);

    const userIds = users.map((user) => user.id);

    // Only use published posts for comments
    const publishedPosts = posts.filter((post) => post.published_at !== null);
    if (publishedPosts.length === 0) {
      throw new Error(
        "No published posts found. Comments can only be added to published posts."
      );
    }

    const postIds = publishedPosts.map((post) => post.id);
    console.log(`Found ${postIds.length} published posts to comment on.`);

    // Delete existing comments (optional)
    console.log("Clearing existing comments...");
    await knex("comments").del();

    console.log("Generating comments...");

    const comments = [];
    const commentIds = []; // We'll store the IDs of inserted comments here

    // STEP 1: First ensure each user has at least 2 comments
    console.log("Ensuring each user has at least 2 comments...");

    for (const user of users) {
      // For each user, create 2 comments on different posts
      const postsToCommentOn = faker.helpers.arrayElements(
        publishedPosts.filter((post) => post.user_id !== user.id), // Don't comment on own posts for this phase
        Math.min(2, publishedPosts.length)
      );

      for (let i = 0; i < postsToCommentOn.length; i++) {
        const post = postsToCommentOn[i];

        // Comment cannot be created before post is published
        const minDate = new Date(post.published_at);

        // Generate a random creation date after post was published
        const createdAt = faker.date.between({
          from: minDate,
          to: "2025-05-15T00:00:00.000Z",
        });

        // Generate an updated date that's either the same as created or later
        const updatedAt = faker.datatype.boolean(20)
          ? faker.date.between({
              from: createdAt,
              to: "2025-05-15T00:00:00.000Z",
            })
          : createdAt;

        comments.push({
          user_id: user.id,
          post_id: post.id,
          content: generateCommentContent(),
          created_at: createdAt,
          updated_at: updatedAt,
          parent_id: null, // Top-level comments have null parent_id
        });
      }
    }

    console.log(
      `Created ${comments.length} comments ensuring each user has at least 2 comments.`
    );

    // STEP 2: Now ensure each post has at least 2 comments
    console.log("Ensuring each post has at least 2 comments...");

    for (const post of publishedPosts) {
      // Count how many comments this post already has
      const existingCommentCount = comments.filter(
        (comment) => comment.post_id === post.id
      ).length;

      // If less than 2, add more comments
      const commentsNeeded = Math.max(0, 2 - existingCommentCount);

      for (let i = 0; i < commentsNeeded; i++) {
        // Select a random user (not the post author)
        const potentialCommenters = userIds.filter((id) => id !== post.user_id);
        const userId = faker.helpers.arrayElement(potentialCommenters);

        // Comment cannot be created before post is published
        const minDate = new Date(post.published_at);

        // Generate a random creation date after post was published
        const createdAt = faker.date.between({
          from: minDate,
          to: "2025-05-15T00:00:00.000Z",
        });

        // Generate an updated date that's either the same as created or later
        const updatedAt = faker.datatype.boolean(20)
          ? faker.date.between({
              from: createdAt,
              to: "2025-05-15T00:00:00.000Z",
            })
          : createdAt;

        comments.push({
          user_id: userId,
          post_id: post.id,
          content: generateCommentContent(),
          created_at: createdAt,
          updated_at: updatedAt,
          parent_id: null, // Top-level comments have null parent_id
        });
      }
    }

    console.log(
      `Created ${comments.length} comments ensuring each user and post has at least 2 comments.`
    );

    // STEP 3: Generate remaining comments to reach 300 total
    const remainingComments = 300 - comments.length;
    console.log(
      `Generating ${remainingComments} additional comments to reach 300 total...`
    );

    if (remainingComments > 0) {
      // Create a distribution for the remaining comments
      const commentDistribution = createCommentDistribution(
        postIds,
        remainingComments
      );

      for (const [postId, commentCount] of Object.entries(
        commentDistribution
      )) {
        const post = publishedPosts.find((p) => p.id === parseInt(postId));

        // Generate multiple comments for this post
        for (let i = 0; i < commentCount; i++) {
          // Select a random user (preferably not the post author to make it more realistic)
          const potentialCommenters = userIds.filter(
            (id) => id !== post.user_id
          );
          const userId =
            potentialCommenters.length > 0
              ? faker.helpers.arrayElement(potentialCommenters)
              : faker.helpers.arrayElement(userIds); // Fallback if only the author is available

          // Comment cannot be created before post is published
          const minDate = new Date(post.published_at);

          // Generate a random creation date after post was published
          const createdAt = faker.date.between({
            from: minDate,
            to: "2025-05-15T00:00:00.000Z",
          });

          // Generate an updated date that's either the same as created or later
          const updatedAt = faker.datatype.boolean(20)
            ? faker.date.between({
                from: createdAt,
                to: "2025-05-15T00:00:00.000Z",
              })
            : createdAt;

          comments.push({
            user_id: userId,
            post_id: parseInt(postId),
            content: generateCommentContent(),
            created_at: createdAt,
            updated_at: updatedAt,
            parent_id: null, // Initially set all as top-level comments
          });
        }
      }
    }

    console.log(`Total comments generated: ${comments.length}`);

    // Insert comments in batches
    const batchSize = 50;
    let insertedCommentIds = [];

    // We need to insert in batches and collect IDs to use for parent_id references
    for (let i = 0; i < comments.length; i += batchSize) {
      const batch = comments.slice(i, i + batchSize);
      const ids = await knex("comments").insert(batch).returning("id");

      // Store the inserted IDs for future reference
      if (Array.isArray(ids) && ids.length > 0) {
        if (typeof ids[0] === "object" && ids[0].hasOwnProperty("id")) {
          // For databases that return objects with id property
          insertedCommentIds = insertedCommentIds.concat(
            ids.map((row) => row.id)
          );
        } else {
          // For databases that return just the IDs
          insertedCommentIds = insertedCommentIds.concat(ids);
        }
      } else if (ids && !isNaN(ids)) {
        // For MySQL/MariaDB that might return the first ID
        const firstId = ids;
        for (let j = 0; j < batch.length; j++) {
          insertedCommentIds.push(firstId + j);
        }
      }

      console.log(
        `Inserted comments ${i + 1} to ${Math.min(
          i + batchSize,
          comments.length
        )}`
      );
    }

    console.log(`Inserted ${insertedCommentIds.length} comments with IDs`);

    // Now add reply comments (with parent_id)
    console.log("Creating nested comments (replies)...");

    // Determine how many replies to create - around 30% of comments should be replies
    const totalReplies = Math.floor(comments.length * 0.3);
    const replyComments = [];

    // Create replies
    for (let i = 0; i < totalReplies; i++) {
      // Pick a random comment to reply to (but only from the first 70% of comments)
      const availableParentIds = insertedCommentIds.slice(
        0,
        Math.floor(insertedCommentIds.length * 0.7)
      );

      if (availableParentIds.length === 0) break;

      const parentComment = await knex("comments")
        .select(["id", "post_id", "created_at", "user_id"])
        .whereIn("id", availableParentIds)
        .orderByRaw("RAND()")
        .first();

      if (!parentComment) continue;

      // Select a user for the reply (preferably not the same as parent comment author)
      const potentialRepliers = userIds.filter(
        (id) => id !== parentComment.user_id
      );
      const userId =
        potentialRepliers.length > 0
          ? faker.helpers.arrayElement(potentialRepliers)
          : faker.helpers.arrayElement(userIds);

      // Reply must come after the parent comment
      const minDate = new Date(parentComment.created_at);

      // Generate a random creation date after parent comment
      const createdAt = faker.date.between({
        from: minDate,
        to: "2025-05-15T00:00:00.000Z",
      });

      // Generate an updated date that's either the same as created or later
      const updatedAt = faker.datatype.boolean(20)
        ? faker.date.between({
            from: createdAt,
            to: "2025-05-15T00:00:00.000Z",
          })
        : createdAt;

      // Create the reply
      const reply = {
        user_id: userId,
        post_id: parentComment.post_id,
        content: generateReplyContent(),
        created_at: createdAt,
        updated_at: updatedAt,
        parent_id: parentComment.id,
      };

      replyComments.push(reply);
    }

    // Insert the replies
    if (replyComments.length > 0) {
      for (let i = 0; i < replyComments.length; i += batchSize) {
        const batch = replyComments.slice(i, i + batchSize);
        await knex("comments").insert(batch);
        console.log(
          `Inserted replies ${i + 1} to ${Math.min(
            i + batchSize,
            replyComments.length
          )}`
        );
      }
    }

    console.log(
      `✅ Successfully added ${replyComments.length} reply comments with parent_id references`
    );
    console.log(
      `✅ Total comments in database: ${comments.length + replyComments.length}`
    );

    // Verify reply structure
    const replyCount = await knex("comments")
      .whereNotNull("parent_id")
      .count("id as count")
      .first();

    console.log(
      `Verification: Database has ${replyCount.count} replies with parent_id set`
    );

    // Verify that every user and post has at least 2 comments
    const userCommentCounts = {};
    const postCommentCounts = {};

    // Get all comments for counting
    const allComments = await knex("comments").select(["user_id", "post_id"]);

    // Initialize counts
    userIds.forEach((id) => {
      userCommentCounts[id] = 0;
    });
    postIds.forEach((id) => {
      postCommentCounts[id] = 0;
    });

    // Count comments
    for (const comment of allComments) {
      userCommentCounts[comment.user_id]++;
      postCommentCounts[comment.post_id]++;
    }

    // Check users with less than 2 comments
    const usersWithLessThanTwoComments = userIds.filter(
      (id) => userCommentCounts[id] < 2
    );

    // Check posts with less than 2 comments
    const postsWithLessThanTwoComments = postIds.filter(
      (id) => postCommentCounts[id] < 2
    );

    // Log validation results
    if (
      usersWithLessThanTwoComments.length === 0 &&
      postsWithLessThanTwoComments.length === 0
    ) {
      console.log(
        "✅ Validation passed: Every user and every post has at least 2 comments."
      );
    } else {
      console.log(
        `⚠️ Validation warning: Found ${usersWithLessThanTwoComments.length} users and ${postsWithLessThanTwoComments.length} posts with less than 2 comments.`
      );
    }

    console.log(`✅ Successfully seeded comments with hierarchical structure`);
  } catch (error) {
    console.error("Error seeding comments:", error);
    console.error(error.stack);
  } finally {
    // Close database connection
    await knex.destroy();
  }
}

/**
 * Generates random comment content with different styles and lengths
 * @returns {string} Random comment content
 */
function generateCommentContent() {
  const contentType = faker.helpers.weightedArrayElement([
    { weight: 40, value: "short" },
    { weight: 40, value: "medium" },
    { weight: 15, value: "long" },
    { weight: 5, value: "emoji" },
  ]);

  let content;
  switch (contentType) {
    case "short":
      content = faker.lorem.sentence();
      break;
    case "medium":
      content = faker.lorem.sentences(faker.number.int({ min: 2, max: 3 }));
      break;
    case "long":
      content = faker.lorem.paragraph();
      break;
    case "emoji":
      content = `${faker.internet.emoji()} ${faker.word.words(
        faker.number.int({ min: 1, max: 5 })
      )} ${faker.internet.emoji()}`;
      break;
  }

  return content;
}

/**
 * Generates content specifically for reply comments
 * Making replies a bit more conversational and reactive
 * @returns {string} Reply comment content
 */
function generateReplyContent() {
  const replyType = faker.helpers.weightedArrayElement([
    { weight: 30, value: "agreement" },
    { weight: 20, value: "disagreement" },
    { weight: 20, value: "question" },
    { weight: 15, value: "additional" },
    { weight: 10, value: "short" },
    { weight: 5, value: "emoji" },
  ]);

  let content;
  switch (replyType) {
    case "agreement":
      content = faker.helpers.arrayElement([
        "I agree with you. " + faker.lorem.sentence(),
        "Exactly! " + faker.lorem.sentence(),
        "That's a great point. " + faker.lorem.sentence(),
        "Well said! " + faker.lorem.sentence(),
        "Couldn't agree more. " + faker.lorem.sentence(),
      ]);
      break;
    case "disagreement":
      content = faker.helpers.arrayElement([
        "I don't think that's right. " + faker.lorem.sentence(),
        "Actually, " + faker.lorem.sentence(),
        "I see it differently. " + faker.lorem.sentence(),
        "Not necessarily. " + faker.lorem.sentence(),
        "I disagree because " + faker.lorem.sentence(),
      ]);
      break;
    case "question":
      content = faker.helpers.arrayElement([
        "Have you considered " + faker.lorem.sentence() + "?",
        "What do you think about " + faker.lorem.words(3) + "?",
        "But what about " + faker.lorem.words(3) + "?",
        "Interesting, but how does that " + faker.lorem.words(4) + "?",
        "Can you explain why " + faker.lorem.sentence() + "?",
      ]);
      break;
    case "additional":
      content = faker.helpers.arrayElement([
        "I'd like to add that " + faker.lorem.sentence(),
        "Also worth noting: " + faker.lorem.sentence(),
        "Adding to your point, " + faker.lorem.sentence(),
        "Not to mention " + faker.lorem.sentence(),
        "Furthermore, " + faker.lorem.sentence(),
      ]);
      break;
    case "short":
      content = faker.helpers.arrayElement([
        "Thanks for sharing!",
        "Interesting perspective.",
        "Good point.",
        "I see what you mean.",
        "That makes sense.",
        "Never thought of it that way.",
        "Appreciate your insight!",
      ]);
      break;
    case "emoji":
      content = `${faker.internet.emoji()} ${faker.helpers.arrayElement([
        "Exactly this!",
        "So true",
        "100%",
        "This made my day",
        "Love this comment",
        "Couldn't have said it better",
      ])} ${faker.internet.emoji()}`;
      break;
  }

  return content;
}

/**
 * Creates a realistic distribution of comments across posts
 * Some posts will have more comments than others (following a rough Pareto principle)
 *
 * @param {Array} postIds - Array of post IDs
 * @param {number} totalComments - Total number of comments to distribute
 * @returns {Object} - Object with post IDs as keys and comment counts as values
 */
function createCommentDistribution(postIds, totalComments) {
  const distribution = {};

  // Initialize all posts with 0 comments
  postIds.forEach((id) => {
    distribution[id] = 0;
  });

  // Select ~20% of posts to have ~80% of comments (Pareto principle)
  const popularPostCount = Math.max(1, Math.floor(postIds.length * 0.2));
  const popularPosts = faker.helpers.arrayElements(postIds, popularPostCount);

  // Allocate ~80% of comments to popular posts
  const popularCommentCount = Math.floor(totalComments * 0.8);
  let remainingPopularComments = popularCommentCount;

  popularPosts.forEach((postId) => {
    if (popularPosts.length === 1) {
      distribution[postId] = popularCommentCount;
    } else {
      // Distribute comments among popular posts (with some randomness)
      const share =
        Math.floor(remainingPopularComments / 2) +
        faker.number.int({
          min: 0,
          max: Math.floor(remainingPopularComments / 4),
        });

      distribution[postId] = Math.min(share, remainingPopularComments);
      remainingPopularComments -= distribution[postId];

      if (remainingPopularComments <= 0) {
        return false; // Break the loop
      }
    }
  });

  // If there are any remaining "popular" comments, add them to the first popular post
  if (remainingPopularComments > 0 && popularPosts.length > 0) {
    distribution[popularPosts[0]] += remainingPopularComments;
  }

  // Distribute remaining comments randomly among other posts
  const remainingComments = totalComments - popularCommentCount;
  const regularPosts = postIds.filter((id) => !popularPosts.includes(id));

  // Distribute remaining comments
  let assignedComments = 0;

  // Make sure at least some of the regular posts get comments
  const minRegularPostsWithComments = Math.min(
    regularPosts.length,
    Math.ceil(regularPosts.length * 0.4)
  );

  const postsToGetComments = faker.helpers.arrayElements(
    regularPosts,
    minRegularPostsWithComments
  );

  postsToGetComments.forEach((postId) => {
    if (assignedComments >= remainingComments) return;

    const commentsForPost = faker.number.int({ min: 1, max: 3 });
    const actualComments = Math.min(
      commentsForPost,
      remainingComments - assignedComments
    );

    distribution[postId] += actualComments;
    assignedComments += actualComments;
  });

  // If there are still comments to assign, distribute them randomly
  while (assignedComments < remainingComments) {
    const randomPostId = faker.helpers.arrayElement(postIds);
    distribution[randomPostId] += 1;
    assignedComments += 1;
  }

  return distribution;
}

// Run the seeder
seedComments();
