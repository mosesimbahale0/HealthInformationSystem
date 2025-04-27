import { Schema, model } from 'mongoose';

const clientSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: String, required: true },
  programs: [{ type: Schema.Types.ObjectId, ref: 'Program' }]
}, { timestamps: true, toJSON: { virtuals: true } });

export default model('Client', clientSchema);
