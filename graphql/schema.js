const { join } = require('path');
const { readdirSync, readFileSync } = require('fs');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const { GraphQLScalarType, Kind } = require('graphql');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const gqlFiles = readdirSync(join(__dirname, './typedefs'));

let typeDefs = '';

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, './typedefs', file), {
    encoding: 'utf8',
  });
});
//console.log(typeDefs)

const schema = makeExecutableSchema({
  typeDefs,
});

module.exports = schema;
// const { gql } = require('apollo-server-express')

// const typeDefs = gql`
//   type ProductStock {
//     size: String
//     sum: Int
//     color: String
//   }

//   input FilterOptionInput {
//     size: String
//   }

//   input GetProductsInput {
//     page: String,
//     perPage: String, 
//     sort: String, 
//     order: String, 
//     search: String
//   }

//   type Product {
//     id: ID
//     productName: String
//     productCategory: String
//     productKindCategory: String
//     productSubCategory: [String]
//     productBrand: String
//     productPrice: Int
//     productImageUrl: [String]
//     productStock: [ProductStock]
//     productDescription: String
//     quantity: Int
//     soldQuantity: Int
//     updatedAt: String
//   }

//   type User {
//     id: ID
//     name: String
//     avatar: String
//   }

//   type OrderItem {
//     _id: ID
//     totalPrice: Int
//     color: String
//     size: String
//     quantity: Int
//     total: String
//     createdAt: String
//   }

//   type Order {
//     _id: ID!
//     userId: ID
//     totalPrice: Int
//     status: String
//     createdAt: String
//     orderItems: [OrderItem]
//   }

//   #ROOT TYPE
//   type Query {
//     products: [Product]
//     product (id: ID!): Product
//     getProducts(input: GetProductsInput!): [Product]
//     orders: [Order]
//   }
// `

// module.exports = typeDefs