import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  console.log(`DAMN req`, req.body);
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    let { db } = await connectToDatabase();
    await db.collection("users").insertOne(JSON.parse(req.body));

    return res.status(201).json({
      message: "Account Created successfully",
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: new Error(error).message,
      error: error,
    });
  }
}
