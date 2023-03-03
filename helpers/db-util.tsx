import { MongoClient } from "mongodb";
export async function connectToDatabase() {
  const username = process.env.mongodb_username;
  const password = process.env.mongodb_password;
  const clustername = process.env.mongodb_clustername;
  const dbname = process.env.mongodb_dbname;
  const connectionString = `mongodb+srv://${username}:${password}@${clustername}.1poyex2.mongodb.net/${dbname}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectionString);
  return client;
}
export async function insertDocument(
  client: any,
  collectionname: any,
  document: any
) {
  const db = client.db();
  const result = await db.collection(collectionname).insertOne(document);
  return result;
}
export async function getDocuments(client:any,collectionname:any,filter = {}){
    const db = client.db();
    const dummyComments = await db
      .collection(collectionname)
      .find(filter)
      .sort({ _id: -1 })
      .toArray();
    return dummyComments;
}
