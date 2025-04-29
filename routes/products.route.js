const express = require("express");
const { readDB, writeDB } = require("../utils/files.util");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await readDB("products");
  res.json({
    products,
  });
});

router.get("/:id", async (req, res) => {
  const products = await readDB("products");
  const product = products.find((product) => product.id === +req.params.id);
  if (!product) {
    res.json({
      status: "error",
      message: "Not found",
    });
    return;
  }
  res.json({
    status: "success",
    data: product,
  });
});

router.post("/", async (req, res) => {
  const products = await readDB("products");
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    product: req.body.product,
  };
  products.push(newProduct);
  await writeDB("products", products);
  res.json({
    status: "success",
    data: newProduct,
  });
});

router.put("/:id", async (req, res) => {
  const products = await readDB("products");
  const productPut = products.findIndex(
    (product) => product.id === +req.params.id
  );
  if (productPut === -1) {
    res.json({
      status: "error",
      message: "Not found",
    });
    return;
  }
  products[productPut].product = req.body.product;
  await writeDB("products", products);
  res.status(200).send();
});

router.delete("/:id", async (req, res) => {
  const products = await readDB("products");
  const productDelete = products.findIndex(
    (product) => product.id === +req.params.id
  );
  if (productDelete === -1) {
    res.json({
      status: "error",
      message: "Not found",
    });
    return;
  }
  products.splice(productDelete, 1);
  await writeDB("products", products);
  res.status(200).send();
});

module.exports = router;
