import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const connect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, { dbName: "userDb" });
  console.log(`MongoDb successfully connected to ${mongoUri}`);
};

export default connect;
