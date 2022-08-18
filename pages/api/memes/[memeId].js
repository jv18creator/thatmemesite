import { connectToDatabase } from "../../../lib/mongodb";
import { withSentry } from "@sentry/nextjs";
import NextCors from "nextjs-cors";

const handler = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

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
};

export default withSentry(handler);
