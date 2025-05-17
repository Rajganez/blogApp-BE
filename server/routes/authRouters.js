import { Router } from "express";
import { signUp } from "../controllers/authControllers.js";

const authRouters = Router();

authRouters.post("/signup", signUp);

export default authRouters;
