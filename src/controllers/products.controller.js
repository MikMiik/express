const { readDB, writeDB } = require("../utils/files.util");

const index = async (req, res) => {
  try {
    const products = await readDB("products");
    if (!products) {
      return res.status(404).json({
        status: "Error",
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Router not found",
    });
  }
};

const show = async (req, res) => {
  try {
    const products = await readDB("products");
    const product = products.find((product) => product.id === +req.params.id);
    if (!product) {
      return res.status(404).json({
        status: "Error",
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Router not found",
    });
  }
};

const store = async (req, res) => {
  try {
    const products = await readDB("products");
    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      title: req.body.title ?? "Empty title",
      price: req.body.price ?? 0,
    };
    products.push(newProduct);
    await writeDB("products", products);
    res.status(201).json({
      status: "Success",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Router not found",
    });
  }
};

const update = async (req, res) => {
  try {
    const products = await readDB("products");
    const productUpdate = products.find(
      (product) => product.id === +req.params.id
    );
    if (!productUpdate) {
      return res.status(404).json({
        status: "Error",
        message: "Product not found",
      });
    }
    Object.assign(productUpdate, req.body);
    await writeDB("products", products);
    res.status(200).json({
      status: "Success",
      data: productUpdate,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Router not found",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const products = await readDB("products");
    const productDelete = products.findIndex(
      (product) => product.id === +req.params.id
    );
    if (productDelete === -1) {
      return res.status(404).json({
        status: "Error",
        message: "Product not found",
      });
    }
    products.splice(productDelete, 1);
    await writeDB("products", products);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Router not found",
    });
  }
};

module.exports = { index, show, store, update, destroy };
