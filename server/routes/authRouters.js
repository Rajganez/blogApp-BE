import { Router } from "express";
import { logIn, signUp } from "../controllers/authControllers.js";
import { verifyToken } from "../middleware/verifyJWTToken.js";

const authRouters = Router();

authRouters.post("/signup", signUp);
authRouters.post("/login", logIn);

export default authRouters;
