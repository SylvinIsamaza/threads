import mongoose, { mongo } from "mongoose";

let isConnected = false;
export const connectDb = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    console.log("Mongodb database not found");
  }
  if (isConnected) {
    console.log("Connected to database");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("Connected to mongodb ");
  } catch (error) {
    console.log(error);
  }
};
const user = mongoose.models.User || mongoose.model("user");
export default user;
