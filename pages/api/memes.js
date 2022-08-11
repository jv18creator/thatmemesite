import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const something = await db.collection("memes").find({});
    // .toArray(function (err, arrResults) {
    //   console.log(`arrResults`, arrResults);
    //   // result = [...arrResults];
    //   for (const result of arrResults) {
    //     results.push(result);
    //   }

    //   return arrResults;
    // });

    const results = await something.toArray();
    console.log(`something`, await something.toArray());
    console.log(`results are`, results);

    return res.status(200).send({
      success: true,
      message: "Memes fetched successfully",
      memes: results,
    });
  } catch (error) {
    console.log(`MEME error`, error);
    return res.status(400).send({
      success: false,
      message: error?.message,
    });
  }
}