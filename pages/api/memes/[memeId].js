import { connectToDatabase } from "../../../lib/mongodb";
import { withSentry } from "@sentry/nextjs";

const handler = async (req, res) => {
  const ObjectId = require("mongodb").ObjectId;
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

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
};

export default withSentry(handler);
