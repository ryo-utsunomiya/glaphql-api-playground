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

  input ToDoInput {
    title: String!
  }

  type Mutation {
    addToDo(input: ToDoInput): ToDo
  }
`);

let fakeDataBase = [
  { id: '1', title: 'Sample ToDo 1'},
  { id: '2', title: 'Sample ToDo 2'},
];

const root = {
  todos: () => fakeDataBase,
  addToDo: ({ input }) => {
    const todo = {
      id: new Date().getTime().toString(),
      title: input.title
    }

    fakeDataBase.push(todo);

    return todo;
  }
};

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
