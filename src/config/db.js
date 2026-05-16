import mongoose from "mongoose";
import "dotenv/config";

console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT_SECRET:", process.env.SECRET_KEY);
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");
  } catch (error) {
    console.log("Error while connecting database:", error.message);
    process.exit(1);
  }
};

export default connection;
