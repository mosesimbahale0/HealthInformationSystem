// src/models/program.model.ts
import { Schema, model } from 'mongoose';
const programSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } });
export default model('Program', programSchema);
