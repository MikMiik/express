const express = require("express");
const dashboardRouter = require("@/routes/admin/dashboard.route");
const categoriesRouter = require("@/routes/admin/categories.route");
const productsRouter = require("@/routes/admin/products.route");
const topicsRouter = require("@/routes/admin/topics.route");
const postsRouter = require("@/routes/admin/posts.route");
const commentsRouter = require("@/routes/admin/comments.route");
const usersRouter = require("@/routes/admin/users.route");
const analyticsRouter = require("@/routes/admin/analytics.route");
const settingsRouter = require("@/routes/admin/settings.route");
const accountSettingsRouter = require("@/routes/admin/accountSettings.route");
const authRouter = require("@/routes/admin/auth.route");

const router = express.Router();
router.use("/", dashboardRouter);
router.use("/", authRouter);
router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);
router.use("/topics", topicsRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/users", usersRouter);
router.use("/analytics", analyticsRouter);
router.use("/settings", settingsRouter);
router.use("/account-settings", accountSettingsRouter);

module.exports = router;
