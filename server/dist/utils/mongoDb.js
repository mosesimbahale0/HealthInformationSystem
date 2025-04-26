import mongoose from "mongoose";
export const connectToDb = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("🍃 Connected to MongoDB Atlas successfully");
    }
    catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error.message);
        process.exit(1);
    }
};
