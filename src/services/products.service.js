const { readDB, writeDB } = require("../utils/files.util");

const RESOURCE = "products";

const index = async (RESOURCE) => {
  const products = await readDB(RESOURCE);
  return products;
};

const show = async (id) => {
  const products = await index(RESOURCE);
  const product = products.find((product) => product.id === +id);
  return product;
};

const store = async (data) => {
  const products = await index(RESOURCE);
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    title: data.title,
    price: data.price,
  };
  products.push(newProduct);
  await writeDB(RESOURCE, products);
  return newProduct;
};

const update = async (id, data) => {
  const products = await index(RESOURCE);
  const productUpdate = products.find((product) => product.id === +id);

  if (!productUpdate) return;
  Object.assign(productUpdate, data);
  await writeDB(RESOURCE, products);
  return productUpdate;
};

const destroy = async (id) => {
  const products = await index(RESOURCE);
  const productDelete = products.findIndex((product) => product.id === +id);

  if (productDelete === -1) return;
  products.splice(productDelete, 1);
  await writeDB(RESOURCE, products);
  return true;
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
