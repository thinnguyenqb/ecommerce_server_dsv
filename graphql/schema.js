const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type productStock {
    size: String
    sum: Int
    color: String
  }

  # input FilterOptionInput {
  #   size: String
  # }

  # input GetProductsInput {
  #   category: String!
  #   kind: String!
  #   sub: String
  #   filterOptions: FilterOptionInput
  # }

  type Product {
    id: ID
    productName: String
    productCategory: String
    productKindCategory: String
    productSubCategory: [String]
    productPrice: Int
    productBrand: String
    productImageUrl: [String]
    productStock: [productStock]
    productDescription: String
  }

  #ROOT TYPE
  type Query {
    products: [Product]
    product (id: ID!): Product
    # getProducts(input: GetProductsInput!): [Product]
  }
`

module.exports = typeDefs