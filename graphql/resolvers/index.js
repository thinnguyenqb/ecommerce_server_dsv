const { productQueries, productMutations } = require('./product');

const resolvers = {
  Query: {
    ...productQueries,
  },
  // Mutation: {
  //   ...productMutations,
  // },
};

module.exports = resolvers;