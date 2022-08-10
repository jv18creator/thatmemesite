import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  console.log(`req received`, req.body.user);
  if (!req?.body?.user) {
    return res.status(405).send({
      success: false,
      message: "User not found",
    });
  }

  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection("users")
      .findOne({ id: req.body.user.id });
    console.log("BEFORE result", result);

    return res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user: result,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error?.message,
    });
  }

  //   return res.status(405).send("Method not allowed.");
}
