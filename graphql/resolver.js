const resolvers = {
	// QUERY
	Query: {
		products: async (parent, args, { mongoDataMethods }) => {
			await mongoDataMethods.getAllProducts();
		},
		getProducts: async (parent, { input }, { mongoDataMethods }) => {
      console.log( { input })
		},
		product: async (parent, { id }, { mongoDataMethods }) => {
			await mongoDataMethods.getProductById(id)
		}
	},

	// MUTATION
}

module.exports = resolvers