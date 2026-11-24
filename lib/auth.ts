import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const rawUri = process.env.MONGODB_URI ?? "";
const uri = rawUri
  .trim()
  .replace(/^MONGODB_URI=/, "")
  .replace(/^["']|["']$/g, "");

if (!uri.startsWith("mongodb")) {
  throw new Error(
    `MONGODB_URI invalid. length=${rawUri.length}, starts with: "${rawUri.slice(0, 8)}"`
  );
}

const client = new MongoClient(uri);

export const auth = betterAuth({
  database: mongodbAdapter(client.db("studiospace_auth")),
 
});