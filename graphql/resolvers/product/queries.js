const productQueries = {
  products: async (parent, args, { mongoDataMethods }) => {
    const res = await mongoDataMethods.getAllProducts()
    return res
  },
  product: async (parent, { id }, { mongoDataMethods }) =>
    await mongoDataMethods.getProductById(id),
  getProducts: async (parent, { input }, { mongoDataMethods }) => {
    const res = await mongoDataMethods.getProducts({ input });
    return res;
  },
};

module.exports = productQueries;

