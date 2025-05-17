import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Load all with env variables
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_CLUSTER = process.env.DB_CLUSTER;

// Get the connection String
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}/?retryWrites=true&w=majority&appName=blogApp`;

// Create new mongoClient
const client = new MongoClient(uri);

// get the db name and connect
const db = client.db(process.env.DB_NAME);

// Function to connect with mongo DB
const connectToDB = async () => {
  try {
    await client.connect();
    console.log("Connected to DB...");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectToDB;
export { db };
