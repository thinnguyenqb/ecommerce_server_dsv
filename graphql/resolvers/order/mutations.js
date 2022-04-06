const orderMutations = {
  updateOrder: async (parent, { input }, { mongoDataMethods }) => {
    console.log(input)
    
    const res = await mongoDataMethods.updateOrder({ input });
    return res;
  },
  //createOrder: async (_, args) => {},
};

module.exports = orderMutations;