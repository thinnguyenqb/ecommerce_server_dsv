const orderMutations = {
  updateOrder: async (parent, { input }, { mongoDataMethods }) => {
    const res = await mongoDataMethods.updateOrder({ input });
    return res;
  },
  // createOrder: async (parent, { input }, { mongoDataMethods }) => {
  //   console.log(input)
  //   return res;
  // },
};

module.exports = orderMutations;