const categoryModel = require("../models/categories");

class Category {
  async getAllCategories(req, res) {
    try {
      let categories = await categoryModel.find({});
      if (categories) {
        return res.json({ categories });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async createCategory(req, res) {
    const { cName, cDescription, cStatus } = req.body;
    try {
      const newCategory = new categoryModel({
        cName,
        cDescription,
        cStatus,
      });
      const savedCategory = await newCategory.save();
      if (savedCategory) {
        return res.json({ success: "Category created successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateCategory(req, res) {
    const { categoryId, cName, cDescription, cStatus } = req.body;
    try {
      const updatedCategory = await categoryModel.findByIdAndUpdate(
        categoryId,
        { cName, cDescription, cStatus },
        { new: true }
      );
      if (updatedCategory) {
        return res.json({ success: "Category updated successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteCategory(req, res) {
    const { categoryId } = req.body;
    try {
      const deletedCategory = await categoryModel.findByIdAndDelete(categoryId);
      if (deletedCategory) {
        return res.json({ success: "Category deleted successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

const categoryController = new Category();
module.exports = categoryController;
