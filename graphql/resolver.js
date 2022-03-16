const resolvers = {
	// QUERY
	Query: {
		products: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllProducts(),
    product: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getProductById(id),
	},

	// MUTATION
}

module.exports = resolvers