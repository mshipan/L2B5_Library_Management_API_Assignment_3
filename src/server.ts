import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("✅ Database connected successfully");

    server = app.listen(process.env.PORT, () => {
      console.log(`🚀 Server is running at port : ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
  }
}

main();
