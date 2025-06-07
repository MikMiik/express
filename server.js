// InitImport
require("module-alias/register");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { createDatabase, testQuery } = require("@/configs/db");

// RouterImport
const router = require("@/routes/api/index");
const adminRouter = require("@/routes/admin/index");

// LayoutImport
const expressLayouts = require("express-ejs-layouts");

// MethodOverideImport
const methodOverride = require("method-override");

// CookieImport
const cookieParser = require("cookie-parser");

//MiddlewareImport
const notFoundHandler = require("@/middlewares/notFoundHandler");
const errorHandler = require("@/middlewares/errorHandler");
const responseEnhancer = require("@/middlewares/responseEnhancer");
const handlePagination = require("@/middlewares/handlePagination");
const handleSidebar = require("@/middlewares/admin/handleSidebar");
const handleSession = require("@/middlewares/admin/handleSession");
const shareLocals = require("@/middlewares/admin/shareLocals");
const checkAuth = require("@/middlewares/admin/checkAuth");
const flash = require("@/middlewares/admin/flash");

/*------------------------------------------------------------ */

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(handlePagination);
app.use(responseEnhancer);

// ViewEngine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.set("layout", "./admin/layouts/default");

// Router
app.use(
  "/admin",
  handleSession,
  flash(),
  shareLocals,
  checkAuth,
  handleSidebar,
  adminRouter,
);
app.use("/api/v1", router);

// ErrorHandle
app.use(notFoundHandler);
app.use(errorHandler);

(async () => {
  try {
    await createDatabase();
    await testQuery();
  } catch (error) {
    console.log(error);
  }
  app.listen(port, () => {
    console.log(`http://localhost:${port}/admin`);
  });
})();
