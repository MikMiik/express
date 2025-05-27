require("module-alias/register");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;
const router = require("@/routes/api/index");
const adminRouter = require("@/routes/admin/index");
const notFoundHandler = require("@/middlewares/notFoundHandler");
const errorHandler = require("@/middlewares/errorHandler");
const responseEnhancer = require("@/middlewares/responseEnhancer");
const handlePagination = require("@/middlewares/handlePagination");
const handleSidebar = require("@/middlewares/admin/handleSidebar");
const handleSession = require("@/middlewares/admin/handleSession");

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(handlePagination);
app.use(responseEnhancer);

// ViewEngine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.set("layout", "./admin/layouts/default");

// Router
app.use("/admin", handleSession, handleSidebar, adminRouter);
app.use("/api/v1", router);

// ErrorHandle
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`http://localhost:${port}/api/v1`);
});
