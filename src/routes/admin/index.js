const express = require("express");
const dashboardRouter = require("@/routes/admin/dashboard.route");
const postsRouter = require("@/routes/admin/posts.route");
const usersRouter = require("@/routes/admin/users.route");

const router = express.Router();

router.use("/", dashboardRouter);
router.use("/posts", postsRouter);
router.use("/users", usersRouter);

module.exports = router;
