import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  if (!req?.body?.meme_data) {
    return res.status(405).send({
      success: false,
      message: "Data not found",
    });
  }

  try {
    const { db } = await connectToDatabase();
    await db.collection("memes").insertOne({
      // title: req.body.meme_data.title,
      description: req.body.meme_data.description,
      meme_caption: req.body.meme_data.meme_caption,
      images: req.body.meme_data.meme_images_url,
      user: req.body.user,
    });

    return res.status(201).json({
      message: "Meme Created Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error?.message,
    });
  }
}
