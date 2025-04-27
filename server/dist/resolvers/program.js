// src/resolvers/program.ts
import Program from '../models/program.model.js';
export const programResolvers = {
    Query: {
        getPrograms: async () => Program.find(),
        getProgram: async (_, { id }) => Program.findById(id)
    },
    Mutation: {
        addProgram: async (_, { program }) => {
            const p = new Program(program);
            return p.save();
        },
        updateProgram: async (_, { id, program }) => Program.findByIdAndUpdate(id, program, { new: true }),
        deleteProgram: async (_, { id }) => Program.findByIdAndDelete(id)
    }
};
