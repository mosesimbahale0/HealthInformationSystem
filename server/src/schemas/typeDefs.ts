// src/schemas/typeDefs.ts
import { gql } from 'graphql-tag';

export default gql`
  type Client {
    id: ID!
    name: String!
    phone: String!
    email: String!
    dob: String!
    programs: [Program]
  }

  type Program {
    id: ID!
    name: String!
    description: String!
  }

  input ClientInput {
    name: String!
    phone: String!
    email: String!
    dob: String!
    programs: [ID]
  }

  input ProgramInput {
    name: String!
    description: String!
  }

  type Query {
    getClients: [Client]
    getClient(id: ID!): Client
    getPrograms: [Program]
    getProgram(id: ID!): Program
    searchClients(query: String!): [Client]
    searchPrograms(query: String!): [Program]
  }

  type Mutation {
    addClient(client: ClientInput!): Client
    addProgram(program: ProgramInput!): Program
    updateClient(id: ID!, client: ClientInput!): Client
    updateProgram(id: ID!, program: ProgramInput!): Program
    deleteClient(id: ID!): Client
    deleteProgram(id: ID!): Program
  }
`;
