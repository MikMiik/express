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
    id: (products.at(-1)?? 0) + 1,
    title: data.title,
    price: data.price,
  };
  // products.push(newProduct);
  const newProducts = [...products, newProduct]
  await writeDB(RESOURCE, newProducts);
  return newProduct;
};

const update = async (id, data) => {
  const products = await index(RESOURCE);
  let productIndex = -1
  const productUpdate = products.find((product, index) => {
    if(product.id === +id) {
      productIndex = index
      return true;
    }
    return false
  });

  if (productIndex === -1 || !productUpdate) return;
  const updatedItem = {...productUpdate,...data}
  const newProducts = [
    ...products.slice(0, productIndex),
    updatedItem,
    ...products.slice(productIndex + 1)
  ]
  await writeDB(RESOURCE, newProducts);
  return updatedItem;
};

const destroy = async (id) => {
  const products = await index(RESOURCE);
  const productDelete = products.findIndex((product) => product.id === +id);

  if (productDelete === -1) return;
  const newProducts = products.filter((_, index)=> index !== productDelete)
  await writeDB(RESOURCE, newProducts);
  return true;
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
