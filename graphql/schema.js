const { join } = require('path');
const { readdirSync, readFileSync } = require('fs');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const gqlFiles = readdirSync(join(__dirname, './typedefs'));

let typeDefs = '';

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, './typedefs', file), {
    encoding: 'utf8',
  });
});

const schema = makeExecutableSchema({
  typeDefs,
});

module.exports = schema;