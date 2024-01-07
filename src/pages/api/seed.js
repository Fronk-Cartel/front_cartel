import db from "/config/dbConnect";
import { Data } from "/models/schema";

export default async function handler(req, res) {
  try {
    await db.connect();

    const sortData = req.body;
    await Data.insertMany(sortData);

    res.send({ message: "seeded successfully" });
  } catch (error) {
    console.error("Error fetching Ads:", error);
    return res.status(500).json({ error: "Server error" });
  }
  // }
}
