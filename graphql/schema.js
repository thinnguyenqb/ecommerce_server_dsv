const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type ProductStock {
    size: String
    sum: Int
    color: String
  }

  input FilterOptionInput {
    size: String
  }

  input GetProductsInput {
    page: String,
    perPage: String, 
    sort: String, 
    order: String, 
    search: String
  }

  type Product {
    id: ID
    productName: String
    productCategory: String
    productKindCategory: String
    productSubCategory: [String]
    productBrand: String
    productPrice: Int
    productImageUrl: [String]
    productStock: [ProductStock]
    productDescription: String
    quantity: Int
    soldQuantity: Int
    updatedAt: String
  }

  type User {
    id: ID
    name: String
    avatar: String
  }

  type OrderItem {
    _id: ID
    totalPrice: Int
    color: String
    size: String
    quantity: Int
    total: String
    createdAt: String
  }

  type Order {
    _id: ID!
    userId: ID
    totalPrice: Int
    status: String
    createdAt: String
    orderItems: [OrderItem]
  }

  #ROOT TYPE
  type Query {
    products: [Product]
    product (id: ID!): Product
    getProducts(input: GetProductsInput!): [Product]
    orders: [Order]
  }
`

module.exports = typeDefs