// src/types/graphql.ts
export interface ClientInput {
    name: string;
    phone: string;
    email: string;
    dob: string;
    programs: string[];
  }
  
  export interface ProgramInput {
    name: string;
    description: string;
  }