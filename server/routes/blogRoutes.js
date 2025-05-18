import { Router } from "express";
import { getAllBlogs } from "../controllers/blogControllers.js";
import { verifyToken } from "../middleware/verifyJWTToken.js";

const blogRouters = Router();

blogRouters.get("/", verifyToken, getAllBlogs);

export default blogRouters;
