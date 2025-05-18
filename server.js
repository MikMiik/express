require("module-alias/register");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const router = require("@/routes");
const adminRouter = require("@/routes/admin/index");
const notFoundHandler = require("@/middlewares/notFoundHandler");
const errorHandler = require("@/middlewares/errorHandler");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ViewEngine
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Router
app.use("/admin", adminRouter);
app.use("/api/v1", router);

// ErrorHandle
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`http://localhost:${port}/api/v1`);
});
