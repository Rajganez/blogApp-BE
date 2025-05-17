import { db } from "../DB/mongo-db.js";
import bcrypt from "bcrypt";

// User Collection data
export const userCollections = db.collection("users");

//--------------------Sign-Up----------------------------//

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Bcrypt the password and inside the bcrypt function send the hashed
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(404).json({ msg: "Error in encrypting" });
      } else {
        const tempUser = {
          Name: name,
          Email: email,
          Password: hash,
        };
        const addUser = await userCollections.insertOne(tempUser);
        if (addUser.acknowledged) {
          return res.status(200).json({ msg: "Added Successfully" });
        }
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Server Error" });
  }
};
