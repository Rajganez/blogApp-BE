import express from "express";
import connectToDB from "./server/DB/mongo-db.js";
import cors from "cors";
import authRouters from "./server/routes/authRouters.js";
import blogRouters from "./server/routes/blogRoutes.js";
import cookieParser from "cookie-parser";

// Initialize express and connect with DB
const app = express();
await connectToDB;

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// Define Routes
app.use("/auth", authRouters);
app.use("/blogs", blogRouters);
// Establish Server Connection
app.listen(
  5000,
  console.log(`Server started at ${new Date()}. Running on port: 5000`)
);
