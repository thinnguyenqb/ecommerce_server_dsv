const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require("graphql")
const { User } = require("../models/User.model")
const { Product } = require("../models/Product.model")
const { Comment } = require("../models/Comment.model")

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    isVerify: { type: GraphQLString },
    displayName: { type: GraphQLString },
  }),
})

const ProductType = new GraphQLObjectType({
  name: "Product",
  description: "Product type",
  fields: () => ({
    id: { type: GraphQLID },
    nameProduct: { type: GraphQLString },
    brand: { type: GraphQLString },
    price: { type: GraphQLInt },
    userId: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.authorId)
      },
    },
    review: {
      type: GraphQLList(ReviewType),
      resolve(parent, args) {
        return Review.find({ ProductId: parent.id })
      },
    },
  }),
})

const ReviewType = new GraphQLObjectType({
  name: "Comment",
  description: "Comment type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId)
      },
    },
    product: {
      type: ProductType,
      resolve(parent, args) {
        return Product.findById(parent.productId)
      },
    },
  }),
})

module.exports = { UserType, ProductType, ReviewType }