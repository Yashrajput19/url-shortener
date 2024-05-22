import mongoose from "mongoose";

export async function connectToMongoDB(url) {
    return await mongoose.connect(url);
}