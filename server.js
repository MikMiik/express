require("module-alias/register");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const router = require("@/routes");
const notFoundHandler = require("@/middlewares/notFoundHandler");
const errorHandler = require("@/middlewares/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/v1", router);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`http://localhost:${port}/api/v1`);
});
