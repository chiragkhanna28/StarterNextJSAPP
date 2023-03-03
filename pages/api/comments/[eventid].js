import { MongoClient } from "mongodb";
import {
  connectToDatabase,
  insertDocument,
  getDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  let client, result, dummyComments;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connection to db failed" });
    return;
  }

  const eventID = req.query.eventid;
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      client.close();
      return;
    }
    console.log(eventID);
    console.log(email, name, text);
    const newComment = {
      email,
      name,
      text,
      eventID,
    };
    console.log(newComment);
    try {
      result = await insertDocument(client, "comments", newComment);
      console.log(result);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "successful", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Insertion to db failed" });
    }
  } else {
    try {
      dummyComments = await getDocuments(client, "comments",{ eventID: eventID });
      res.status(200).json({ comments: dummyComments });
    } catch (error) {
      res.status(500).json({ message: "Fetching documents failed" });
    }
  }
  client.close();
}

export default handler;
