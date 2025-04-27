// src/resolvers/program.ts
import Program from '../models/program.model.js';

export const programResolvers = {
  Query: {
    getPrograms: async () => Program.find(),
    getProgram: async (_: any, { id }: any) => Program.findById(id)
  },
  Mutation: {
    addProgram: async (_: any, { program }: any) => {
      const p = new Program(program);
      return p.save();
    },
    updateProgram: async (_: any, { id, program }: any) =>
      Program.findByIdAndUpdate(id, program, { new: true }),
    deleteProgram: async (_: any, { id }: any) => Program.findByIdAndDelete(id)
  }
};
