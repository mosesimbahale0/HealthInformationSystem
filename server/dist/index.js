// import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@apollo/server/express4";
// import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
// import express from "express";
// import { createServer } from "http";
// import { makeExecutableSchema } from "@graphql-tools/schema";
// import bodyParser from "body-parser";
// import cors from "cors";
// import mongoose, { ConnectOptions } from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
// import path from "path";
// import fs from "fs/promises";
// import { fileURLToPath } from "url";
// import colors from "colors";
// import { Schema, model } from "mongoose";
// // ------------------------------------------------------------------------------------------------
// // MONGODB
// // ------------------------------------------------------------------------------------------------
// const localMongoUrl = process.env.MONGODB_URI;
// mongoose.connect(localMongoUrl);
// const db = mongoose.connection;
// db.on("error", (err) => {
//   console.error("Error connecting to MongoDB:", err);
//   process.exit(1);
// });
// db.once("open", () => {
//   console.log("🍃 Connected to MongoDB successfully");
// });
// // ------------------------------------------------------------------------------------------------
// //  PROFILING
// // ------------------------------------------------------------------------------------------------
// process.on("warning", (e) => console.warn(e.stack));
// const used = process.memoryUsage();
// console.log(`Memory Usage ++++++++++++++:
//   RSS: ${(used.rss / 1024 / 1024).toFixed(2)} MB
//   Heap Total: ${(used.heapTotal / 1024 / 1024).toFixed(2)} MB
//   Heap Used: ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB
//   External: ${(used.external / 1024 / 1024).toFixed(2)} MB`);
// // ------------------------------------------------------------------------------------------------
// //  Mongoose Models
// // ------------------------------------------------------------------------------------------------
// // client schema
// const clientSchema = new Schema(
//   {
//     name: { type: String, required: true }, // name
//     phone: { type: String, required: true }, // Phone number
//     email: { type: String, required: true }, // Email    dob: String
//     dob: { type: String, required: true }, // Date of birth,
//     programs: Array,
//   },
//   { timestamps: true }
// );
// const Client = model("Client", clientSchema);
// // Program schema
// const programSchema = new Schema(
//   {
//     name: { type: String, required: true }, // Program name
//     description: { type: String, required: true }, // Program description
//   },
//   { timestamps: true }
// );
// const Program = model("Program", programSchema);
// // ------------------------------------------------------------------------------------------------
// //  GraphQL Schema
// // ------------------------------------------------------------------------------------------------
// const typeDefs = `#graphql
// type Client {
//   id: ID! # MongoDB ObjectId as the unique identifier
//   name: String!
//   phone: String!
//   email: String!
//   dob: String!
//   programs: [ClientProgram]
// }
// # An array of IDs
// type ClientProgram {
//   _program_id: String
// }
// input ClientProgramInput {
//     _program_id: String
//   }
// type Program {
//   id: ID!
//   name: String!
//   description: String!
// }
// input ClientInput {
//   name: String!
//   phone: String!
//   email: String!
//   dob: String!
//   programs: [ClientProgramInput]
// }
// input ProgramInput {
//   name: String!
//   description: String!
// }
// # Queries
// type Query {
//   getClients: [Client]
//   getClient(id: ID!): Client
//   getPrograms: [Program]
//   getProgram(id: ID!): Program
//   searchClients(query: String!): [Client]
//   searchPrograms(query: String!): [Program]
// }
// # Mutations
// type Mutation {
//   addClient(client: ClientInput!): Client
//   addProgram(program: ProgramInput!): Program
//   updateClient(id: ID!, client: ClientInput!): Client
//   updateProgram(id: ID!, program: ProgramInput!): Program
//   deleteClient(id: ID!): Client
//   deleteProgram(id: ID!): Program
// }
// `;
// const resolvers = {
//   Query: {
//     getClients: async () => {
//       return await Client.find().populate("programs");
//     },
//     getClient: async (_, { id }) => {
//       return await Client.findById(id).populate("programs");
//     },
//     getPrograms: async () => {
//       return await Program.find();
//     },
//     getProgram: async (_, { id }) => {
//       return await Program.findById(id);
//     },
//     searchClients: async (_, { query }) => {
//       const regex = new RegExp(query, "i");
//       return await Client.find({
//         $or: [{ name: regex }, { phone: regex }, { email: regex }],
//       }).populate("programs");
//     },
//   },
//   Mutation: {
//     addClient: async (_, { client }) => {
//       const newClient = new Client(client);
//       const saved = await newClient.save();
//       return await saved.populate("programs"); // now programs are full docs with .id virtual
//     },
//     addProgram: async (_, { program }) => {
//       const newProgram = new Program(program);
//       return await newProgram.save();
//     },
//     updateClient: async (_, { id, client }) => {
//       return await Client.findByIdAndUpdate(id, client, { new: true })
//         .populate("programs")
//         .exec();
//     },
//     updateProgram: async (_, { id, program }) => {
//       return await Program.findByIdAndUpdate(id, program, { new: true });
//     },
//     deleteClient: async (_, { id }) => {
//       return await Client.findByIdAndDelete(id);
//     },
//     deleteProgram: async (_, { id }) => {
//       return await Program.findByIdAndDelete(id);
//     },
//   },
// };
// // const PORT = process.env.PORT || 4000;
// const PORT = 4000;
// const schema = makeExecutableSchema({ typeDefs, resolvers });
// const app = express();
// // CORS
// app.use(
//   cors({
//     origin: "*", // Allows all origins
//     methods: ["GET", "POST"], // Most GraphQL servers only need these
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true, // Use true if authentication is required
//   })
// );
// // Static file setup
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, "../etc/secrets")));
// app.use(express.static(path.join(__dirname, "../public")));
// const filePath = path.join(__dirname, "../public/index.html");
// (async () => {
//   try {
//     const index = await fs.readFile(filePath, "utf-8");
//     app.get("/", (_, res) => {
//       res.send(index);
//     });
//   } catch (error) {
//     console.error("Error reading file:", error);
//   }
// })();
// // Create and start Apollo Server
// const httpServer = createServer(app);
// const server = new ApolloServer({
//   schema,
//   introspection: true,
//   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
// });
// await server.start();
// app.use("/graphql", bodyParser.json(), expressMiddleware(server));
// // Start HTTP server
// httpServer.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}/graphql`);
// });
// ------------------------------------------------------------------------------------------------------
// REFACTORED
// ------------------------------------------------------------------------------------------------------
// Directory structure:
// src/
// ├── index.ts
// ├── utils/
// │   ├── db.ts
// │   └── profiling.ts
// ├── models/
// │   ├── client.model.ts
// │   └── program.model.ts
// ├── schemas/
// │   └── typeDefs.ts
// ├── resolvers/
// │   ├── client.ts
// │   ├── program.ts
// │   └── index.ts
// ├── middlewares/
// │   └── cors.ts
// └── types/
//     └── graphql.ts
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import colors from 'colors';
import cors from './middlewares/cors.js';
import connectDB from './utils/db.js';
import logMemory from './utils/profiling.js';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './resolvers/index.js';
// Connect to MongoDB
connectDB();
// Log memory usage
logMemory();
// Build executable schema
const server = new ApolloServer({
    schema: await import('@graphql-tools/schema').then(m => m.makeExecutableSchema({ typeDefs, resolvers })),
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer: createServer() })],
});
await server.start();
const app = express();
const httpServer = createServer(app);
// Middlewares
app.use(cors);
app.use(bodyParser.json());
app.use('/graphql', expressMiddleware(server));
// Static files & SPA
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../etc/secrets')));
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', async (_, res) => {
    const indexHtml = await fs.readFile(path.join(__dirname, '../public/index.html'), 'utf-8');
    res.send(indexHtml);
});
// Start server
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => console.log(colors.green(`🚀 Server ready at http://localhost:${PORT}/graphql`)));
