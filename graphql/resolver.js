const resolvers = {
	// QUERY
	Query: {
		products: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllProducts(),
    product: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getProductById(id),
		// getProducts: async (parent, { input }, { mongoDataMethods }) => {
		// 	console.log( { input })
		// },
	},

	// MUTATION
}

module.exports = resolvers