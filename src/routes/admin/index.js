const express = require("express");
const dashboardRouter = require("@/routes/admin/dashboard.route");
const postsRouter = require("@/routes/admin/posts.route");

const router = express.Router();

router.use("/", dashboardRouter);
router.use("/posts", postsRouter);

module.exports = router;
