const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type productStock {
    S: Int
    M: Int
    L: Int
  }

  type Product {
    id: ID
    productName: String
    productCategory: String
    productSubCategory: [String]
    productPrice: Int
    productBrand: String
    productImageUrl: [String]
    productStock: productStock
    productDescription: String
  }

  #ROOT TYPE
  type Query {
    products: [Product]
    product (id: ID!): Product
  }
`

module.exports = typeDefs