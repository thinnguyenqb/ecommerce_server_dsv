const { productQueries, productMutations } = require('./product');
const { orderQueries, orderMutations } = require('./order');

const resolvers = {
  Query: {
    ...productQueries,
    ...orderQueries
  },
  Mutation: {
    //...productMutations,
    ...orderMutations,
  },
};

module.exports = resolvers;