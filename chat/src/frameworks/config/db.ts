import mongoose from "mongoose";
require("dotenv").config();

const dbUrl: string | undefined = process.env.MONGO_URI

// mongodb database connection
const connectDb = async () => {
  try {
    if (dbUrl) {
      await mongoose.connect(dbUrl).then((data: any) => {
        console.log(`Database connected ${data.connection.host}`);
      });
    }
  } catch (error: any) {
    console.log(error.message)
    setTimeout(connectDb, 5000);
  }
};

export default connectDb;
