const express = require("express");
const dashboardRouter = require("@/routes/admin/dashboard.route");
const postsRouter = require("@/routes/admin/posts.route");
const usersRouter = require("@/routes/admin/users.route");
const authRouter = require("@/routes/admin/auth.route");

const router = express.Router();

router.use("/", dashboardRouter);
router.use("/posts", postsRouter);
router.use("/users", usersRouter);
// router.use("/", authRouter);

module.exports = router;
