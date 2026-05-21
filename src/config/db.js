import mongoose from "mongoose";
import "dotenv/config";

if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URL missing");
}

if (!process.env.SECRET_KEY) {
  throw new Error("SECRET_KEY missing");
}

const connection = async () => {
  try {
    // console.log("Connecting DB...");
    await mongoose.connect(
      process.env.MONGO_URL,
      //    {
      //   serverSelectionTimeoutMS: 10000,
      // }
    );
    console.log("Database Connected");
  } catch (error) {
    console.log("Error while connecting database:", error.message);
    process.exit(1);
  }
};

export default connection;
