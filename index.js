import express from "express";
import connectToDB from "./server/DB/mongo-db.js";
import cors from "cors";
import authRouters from "./server/routes/authRouters.js";

// Initialize express and connect with DB
const app = express();
await connectToDB;

app.use(cors());

app.use(express.json());

// Define Routes
app.use("/auth", authRouters)
// Establish Server Connection
app.listen(
  5000,
  console.log(`Server started at ${new Date()}. Running on port: 5000`)
);
