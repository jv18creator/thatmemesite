import { connectToDatabase } from "../../lib/mongodb";
import { withSentry } from "@sentry/nextjs";

const handler = async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const memes = await db.collection("memes").find({});

    const results = await memes.toArray();

    return res.status(200).send({
      success: true,
      message: "Memes fetched successfully",
      memes: results,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error?.message,
    });
  }
};

export default withSentry(handler);
