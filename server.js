const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require("express-graphql")
const schema = require("./graphql/schema")

const app = express();
app.use(express.json());
app.use(cors());

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

app.get('/', (req, res, next) => {
    res.json({msg: "Hello everyone!"});
});

app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    })
  )


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});