import { db } from "../DB/mongo-db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User Collection data
export const userCollections = db.collection("users");
// Blog Collection Data
export const blogCollections = db.collection("blogs");

// Function to create jwt token
const createJWT = (email, id) => {
  return jwt.sign({ mail: email, id: id }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });
};

//Middleware to set the cookie token in the response
const cookieOptions = {
  httpOnly: true,
  secure: "production",
  sameSite: "None",
  expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
};

//--------------------Sign-Up----------------------------//

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // If the email already exists in the DB return error to login
    const findUser = await userCollections.findOne({ Email: email });
    // If user is in the DB return to login
    if (findUser) {
      return res
        .status(403)
        .json({ msg: "User already exists. Please login." });
    }

    // Hasing the password
    const hash = await bcrypt.hash(password, 10);
    // Storing it in the temp variable
    const tempUser = {
      Name: name,
      Email: email,
      Password: hash,
    };
    // Store the User in the DB
    const addUser = await userCollections.insertOne(tempUser);

    // Return success if the user is stored in the DB
    if (addUser.acknowledged) {
      return res.status(201).json({ msg: "User created. Please login." });
    } else {
      return res
        .status(400)
        .json({ msg: "User creation failed. Try again later." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Server Error", error: error.message });
  }
};

//--------------------Login------------------------------//

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Get the user from the DB using the email
    const getUser = await userCollections.findOne({ Email: email });
    // If email error or not signed up throw error
    if (!getUser) {
      return res.status(404).json({ msg: "Email not registered" });
    }
    const isPasswordMatch = await bcrypt.compare(password, getUser.Password);
    if (isPasswordMatch) {
      res.cookie("jwt", createJWT(getUser.email, getUser._id), cookieOptions);
      return res.status(200).json({
        msg: "Logged in successfully",
        id: getUser._id,
        name: getUser.Name,
      });
    } else {
      return res.status(401).json({ msg: "Password not match" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong", error });
  }
};
