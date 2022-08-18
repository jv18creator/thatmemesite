import { connectToDatabase } from "../../../lib/mongodb";
export default async function handler(req, res) {
  const ObjectId = require("mongodb").ObjectId;

  if (!req.query.memeId) {
    return res.status(404).send({
      success: false,
      message: "Meme not found",
    });
  }

  try {
    const { db } = await connectToDatabase();
    const meme = await db
      .collection("memes")
      .findOne({ _id: ObjectId(req.query.memeId) });

    return res.status(200).send({
      success: true,
      message: "Meme fetched successfully",
      meme: meme,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error?.message,
    });
  }
}
