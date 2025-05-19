import { blogCollections } from "./authControllers.js";
import { ObjectId } from "mongodb";

//----------------Get All Blogs-----------------------//

export const getAllBlogs = async (req, res) => {
  // Get All the blogs from the DB and sort it by created date
  try {
    const getBlogs = await blogCollections
      .find({})
      .sort({ createdAt: 1 })
      .toArray();
    // Return if all the blogs are retrieved from the DB
    if (getBlogs) return res.status(200).json({ getBlogs });
    else return res.status(401).json({ msg: "No blogs Found" });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

//----------------Create a Blog------------------------//

export const createBlog = async (req, res) => {
  const payload = req.body;
  try {
    const changePayloadVar = {
      content: payload.content,
      category: payload.category,
      author: payload.author,
      topic: payload.topic,
      userId: ObjectId.createFromHexString(payload.userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const addBlog = await blogCollections.insertOne({ ...changePayloadVar });
    if (addBlog)
      return res.status(201).json({ msg: "Blog Created Successfully" });
    else return res.status(401).json({ msg: "Blog not created" });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

//----------------Filter Blogs-------------------------//

export const filterBlogs = async (req, res) => {
  try {
    const { category, author } = req.query;
    const query = {};

    if (category) {
      const categories = category
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);
      if (categories.length > 0) query.category = { $in: categories };
    }

    if (author) {
      const authors = author
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);
      if (authors.length > 0) query.author = { $in: authors };
    }

    const filteredBlogs = await blogCollections.find(query).toArray();

    if (filteredBlogs) {
      return res.status(200).json({ filteredBlogs });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

//----------------Edit Blogs-------------------------//

export const editBlog = async (req, res) => {
  const { id } = req.params;
  const { topic, content, category } = req.body;

  try {
    const blogId = ObjectId.createFromHexString(id);
    const getBlog = await blogCollections.findOne({ _id: blogId });

    if (!getBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const updatedData = {
      topic,
      content,
      category,
      author: getBlog.author,
      createdAt: getBlog.createdAt,
      updatedAt: new Date(),
    };

    const result = await blogCollections.findOneAndUpdate(
      { _id: blogId },
      { $set: updatedData },
      { returnDocument: "after" }
    );

    return res.status(200).json({ msg: "Blog updated", blog: result.value });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//----------------Delete Blogs-----------------------//

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blogId = ObjectId.createFromHexString(id);
    const deletedblog = await blogCollections.findOneAndDelete({ _id: blogId });
    if (deletedblog) {
      return res.status(200).json({ msg: "Deleted Successufully" });
    }
    return res.status(401).json({ msg: "Blog not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};
