// src/utils/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export default function connectDB() {
    const uri = process.env.MONGODB_URI;
    mongoose.connect(uri);
    const db = mongoose.connection;
    db.on('error', err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
    db.once('open', () => console.log('🍃 Connected to MongoDB'));
}
