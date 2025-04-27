// src/resolvers/index.ts
import { clientResolvers } from './client.js';
import { programResolvers } from './program.js';
export default {
    Query: {
        ...clientResolvers.Query,
        ...programResolvers.Query
    },
    Mutation: {
        ...clientResolvers.Mutation,
        ...programResolvers.Mutation
    }
};
