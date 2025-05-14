const express = require("express");
const router = express.Router();
const {
  createCategoryValidator,
  updateCategoryValidator,
} = require("../validators/categories.validator");

const {
  index,
  show,
  store,
  update,
  destroy,
} = require("../controllers/categories.controller");

router.get("/", index);
router.get("/:id", show);
router.post("/", createCategoryValidator, store);
router.put("/:id", updateCategoryValidator, update);
router.patch("/:id", updateCategoryValidator, update);
router.delete("/:id", destroy);

module.exports = router;
