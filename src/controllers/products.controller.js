const { readDB, writeDB } = require("../utils/files.util");

const index = async (req, res) => {
  const products = await readDB("products");
  res.json({
    status: "success",
    products,
  });
};

const show = async (req, res) => {
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
};

const store = async (req, res) => {
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
};

const update = async (req, res) => {
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
  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
  });
};

const destroy = async (req, res) => {
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
  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
  });
};

module.exports = { index, show, store, update, destroy };
