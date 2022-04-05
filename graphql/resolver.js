const resolvers = {
	// QUERY
	Query: {
		products: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllProducts(),
    product: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getProductById(id),
		getProducts: async (parent, { input }, { mongoDataMethods }) => {
			const res = await mongoDataMethods.getProducts({ input });
			return res;
		},
		orders: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getOrders(),
	  },
	// MUTATION

}

module.exports = resolvers