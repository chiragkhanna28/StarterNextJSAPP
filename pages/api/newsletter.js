import { MongoClient } from "mongodb";
import {connectToDatabase,insertDocument} from "../../helpers/db-util"

async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }
    let client,result;
    try {
      client = await connectToDatabase();
    } catch (error) {
        res.status(500).json({ message: "Connection to db failed" });
        return;
    }
    try {
      result = await insertDocument(client, "newsletter", { email: email });
      client.close();
    } catch (error) {
        res.status(500).json({ message: "Insertion to db failed" });
        return;
    }
    console.log(result);
    res.status(201).json({ message: "successful" });
  }
}

export default handler;
