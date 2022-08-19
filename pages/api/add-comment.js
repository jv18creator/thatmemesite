import { connectToDatabase } from "../../lib/mongodb";
import { Timestamp } from "mongodb";

export default async function handler(req, res) {
  const ObjectId = require("mongodb").ObjectId;

  if (!req.body?.commented_by || !req.body?.meme_id) {
    res.status(400).send({
      success: false,
      message: "User or meme post does not exist.",
    });
  }

  try {
    const { db } = await connectToDatabase();

    const result = await db.collection("memes").findOneAndUpdate(
      { _id: ObjectId(req.body.meme_id) },
      {
        $push: {
          commented_by: {
            ...req.body.commented_by,
            updatedAt: new Timestamp(),
          },
        },
      },
      { returnDocument: "after" }
    );

    return res.status(200).send({
      success: true,
      message: "Commented Successfully",
      meme: result.value,
    });
    // }
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error?.message,
    });
  }
}
