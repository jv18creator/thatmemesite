import { connectToDatabase } from "../../../lib/mongodb";
import { withSentry } from "@sentry/nextjs";

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = async (req, res) => {
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

export default withSentry(allowCors(handler));
