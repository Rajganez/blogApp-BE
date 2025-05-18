import { blogCollections } from "./authControllers.js";
import { ObjectId } from "mongodb";

//----------------Get All Blogs-----------------------//

export const getAllBlogs = async (req, res) => {
  // Get All the blogs from the DB and sort it by created date
  try {
    const getBlogs = await blogCollections.find({}).toArray();

    const sortedBlogs = getBlogs.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return res.status(200).json({ sortedBlogs });
  } catch (error) {
    console.log(error);
  }
};
