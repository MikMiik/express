const { readDB, writeDB } = require("@/utils/files.util");

const index = async (req, res) => {
  try {
    const categories = await readDB("categories");
    if (!categories) {
      return res.status(404).json({
        status: "Error",
        message: "Category not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: categories,
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
    const categories = await readDB("categories");
    const category = categories.find(
      (category) => category.id === +req.params.id
    );
    if (!category) {
      return res.status(404).json({
        status: "Error",
        message: "Category not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: category,
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
    const categories = await readDB("categories");
    const newCategory = {
      id: categories.length ? categories[categories.length - 1].id + 1 : 1,
      type: req.body.type ?? "Empty type",
      description: req.body.description ?? "Empty description",
    };
    categories.push(newCategory);
    await writeDB("categories", categories);
    res.status(201).json({
      status: "Success",
      data: newCategory,
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
    const categories = await readDB("categories");
    const categoryUpdate = categories.find(
      (category) => category.id === +req.params.id
    );
    if (!categoryUpdate) {
      return res.status(404).json({
        status: "Error",
        message: "Category not found",
      });
    }
    Object.assign(categoryUpdate, req.body);
    await writeDB("categories", categories);
    res.status(200).json({
      status: "Success",
      data: categoryUpdate,
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
    const categories = await readDB("categories");
    const categoryDelete = categories.findIndex(
      (category) => category.id === +req.params.id
    );
    if (categoryDelete === -1) {
      return res.status(404).json({
        status: "Error",
        message: "Category not found",
      });
    }
    categories.splice(categoryDelete, 1);
    await writeDB("categories", categories);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Router not found",
    });
  }
};

module.exports = { index, show, store, update, destroy };
