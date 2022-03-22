const Category = require('../models/Category.model')
const SubCategory = require('../models/SubCategory.model')

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const category = await Category.find();
      const data = [];
      const dataResult = [];
      for (let i = 0; i < category.length; i++) {
        for (let j = 0; j < category[i].categoryKind.length; j++) {
          const subCategories = await SubCategory.findById(category[i].categoryKind[j])

          const subCategory = {
            subCategory: subCategories.subCategory,
            nameKindCategory: subCategories.nameKindCategory
          }
          data.push(subCategory)
        }
        dataResult.push({
          ...category[i]._doc,
          categoryKind: data[i]
        })
      }
      res.json(dataResult)

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryController;
