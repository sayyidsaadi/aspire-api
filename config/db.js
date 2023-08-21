import mongoose from "mongoose";

// Connect With MongooDB
const connectWithMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected Successful`.bgYellow.black);
  } catch (error) {
    console.log(`${error.message}`);
  }
};

// Export
export default connectWithMongodb;
