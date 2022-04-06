const orderQueries = {
  orders: async (parent, args, { mongoDataMethods }) => {
    const res = await mongoDataMethods.getOrders()
    return res
	  }
};

module.exports = orderQueries
