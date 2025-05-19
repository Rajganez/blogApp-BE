import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
  filterBlogs,
  getAllBlogs,
} from "../controllers/blogControllers.js";
import { verifyToken } from "../middleware/verifyJWTToken.js";

const blogRouters = Router();

blogRouters.get("/", verifyToken, getAllBlogs);
blogRouters.post("/", verifyToken, createBlog);
blogRouters.get("/filter", verifyToken, filterBlogs);
blogRouters.put("/:id", verifyToken, editBlog);
blogRouters.delete("/:id", verifyToken, deleteBlog);

export default blogRouters;
