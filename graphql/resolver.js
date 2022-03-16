const resolvers = {
	// QUERY
	Query: {
		products: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllProducts(),
	},

	// MUTATION
}

module.exports = resolvers