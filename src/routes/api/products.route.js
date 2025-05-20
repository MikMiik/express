const express = require("express");
const {
  createProductValidator,
  updateProductValidator,
} = require("../../validators/products.validator.js");

const {
  index,
  show,
  store,
  update,
  destroy,
} = require("../../controllers/api/products.controller.js");
const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", createProductValidator, store);
router.put("/:id", updateProductValidator, update);
router.patch("/:id", updateProductValidator, update);
router.delete("/:id", destroy);

module.exports = router;
