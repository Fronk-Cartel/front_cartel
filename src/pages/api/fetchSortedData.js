import { Data } from "../../../models/schema";
import db from "../../../config/dbConnect";

export default async function handler(req, res) {
  try {
    await db.connect();

    const getData = await Data.find();
    await db.disconnect();
    res.status(200).json(getData);
  } catch (error) {
    console.error("Error fetching Users:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
