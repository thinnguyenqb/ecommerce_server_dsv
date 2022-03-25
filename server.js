const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const { ApolloServer } = require('apollo-server-express')

// Load schema & resolvers
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolver')

// Load db methods
const mongoDataMethods = require('./data/db')

// Connect to mongodb
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, err => {
    if (err) throw err;
    console.log("Connected to mongdb!");
})

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}))

let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ mongoDataMethods })
    });
    const server = await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();

app.get('/', (req, res, next) => {
    res.json({msg: "Hello world!"});
});

// Routes
app.use('/user', require('./routes/user.routes'));
app.use('/category', require('./routes/category.routes'));
app.use('/product', require('./routes/product.routes'));
app.use('/api/review', require('./routes/review.routes'));
app.use('/api/upload_img', require('./routes/upload.routes'));
app.use('/api/order', require('./routes/order.routes'));
app.use('/api/order_item', require('./routes/orderItem.routes'));

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});