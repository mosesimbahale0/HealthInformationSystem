
// src/resolvers/client.ts
import Client from '../models/client.model.js';

export const clientResolvers = {
  Query: {
    getClients: async () => Client.find().populate('programs'),
    getClient: async (_: any, { id }: any) => Client.findById(id).populate('programs'),
    searchClients: async (_: any, { query }: any) => {
      const re = new RegExp(query, 'i');
      return Client.find({ $or: [{ name: re }, { phone: re }, { email: re }] }).populate('programs');
    }
  },
  Mutation: {
    addClient: async (_: any, { client }: any) => {
      const newC = new Client(client);
      const saved = await newC.save();
      return saved.populate('programs');
    },
    updateClient: async (_: any, { id, client }: any) =>
      Client.findByIdAndUpdate(id, client, { new: true }).populate('programs').exec(),
    deleteClient: async (_: any, { id }: any) => Client.findByIdAndDelete(id)
  }
};