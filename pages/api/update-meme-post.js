import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const ObjectId = require("mongodb").ObjectId;

  if (!req.body.liked_by || !req.body.meme_id) {
    res.status(400).send({
      success: false,
      message: "User or meme post does not exist.",
    });
  }
  //  else if (typeof req.body.liked !== "undefined") {
  //   res.status(400).send({
  //     success: false,
  //     message: "Operation is not clear",
  //   });
  // }

  try {
    const { db } = await connectToDatabase();

    if (req.body.liked) {
      const result = await db.collection("memes").updateOne(
        { _id: ObjectId(req.body.meme_id) },
        {
          $push: {
            liked_by: req.body.liked_by,
          },
        }
      );
      // addToSet

      if (result.acknowledged || result.modifiedCount) {
        const meme_post = await db
          .collection("memes")
          .findOne({ _id: ObjectId(req.body.meme_id) });

        return res.status(200).send({
          success: true,
          message: "Liked Successfully",
          meme: meme_post,
        });
      }
    } else {
      const result = await db.collection("memes").updateOne(
        { _id: ObjectId(req.body.meme_id) },
        {
          $pull: {
            liked_by: req.body.liked_by,
          },
        }
      );

      if (result.acknowledged || result.modifiedCount) {
        const meme_post = await db
          .collection("memes")
          .findOne({ _id: ObjectId(req.body.meme_id) });

        return res.status(200).send({
          success: true,
          message: "Liked Successfully",
          meme: meme_post,
        });
      }
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error?.message,
    });
  }
}
