const ProductsService = require("@/services/products.service");
const throwError = require("@/utils/throwError");
const response = require("@/utils/response");

const index = async (req, res) => {
  const products = await ProductsService.index("products");
  if (!products) throwError(404, "Product not found");
  response.success(res, 200, products);
};

const show = async (req, res) => {
  const product = await ProductsService.show(req.params.id);
  if (!product) throwError(404, "Product not found");
  response.success(res, 200, product);
};

const store = async (req, res) => {
  const newProduct = await ProductsService.store(req.body);
  response.success(res, 201, newProduct);
};

const update = async (req, res) => {
  const productUpdate = await ProductsService.update(req.params.id, req.body);
  if (!productUpdate) throwError(404, "Product not found");
  response.success(res, 200, productUpdate);
};

const destroy = async (req, res) => {
  const result = await ProductsService.destroy(req.params.id);
  if (!result) throwError(404, "Product not found");
  res.status(200).send();
};

module.exports = { index, show, store, update, destroy };
