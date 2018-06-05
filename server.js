const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type ToDo {
    id: ID!
    title: String!
  }

  type Query {
    todos: [ToDo]
  }
`);

let fakeDataBase = [
  { id: '1', title: 'Sample ToDo 1'},
  { id: '2', title: 'Sample ToDo 2'},
];

const root = {
  todos: () => fakeDataBase,
};

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
