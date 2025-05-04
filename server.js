const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const router = require("./src/routes");

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`http://localhost:${port}/api/v1`);
});
