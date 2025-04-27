// src/resolvers/client.ts
import Client from '../models/client.model.js';
export const clientResolvers = {
    Query: {
        getClients: async () => Client.find().populate('programs'),
        getClient: async (_, { id }) => Client.findById(id).populate('programs'),
        searchClients: async (_, { query }) => {
            const re = new RegExp(query, 'i');
            return Client.find({ $or: [{ name: re }, { phone: re }, { email: re }] }).populate('programs');
        }
    },
    Mutation: {
        addClient: async (_, { client }) => {
            const newC = new Client(client);
            const saved = await newC.save();
            return saved.populate('programs');
        },
        updateClient: async (_, { id, client }) => Client.findByIdAndUpdate(id, client, { new: true }).populate('programs').exec(),
        deleteClient: async (_, { id }) => Client.findByIdAndDelete(id)
    }
};
