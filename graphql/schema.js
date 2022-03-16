const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Products {
    id: ID
    productName: String
  }

  #ROOT TYPE
  type Query {
    Product: [Products]
  }
`

module.exports = typeDefs