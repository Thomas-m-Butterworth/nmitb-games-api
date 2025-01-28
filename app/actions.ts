"use server";

import clientPromise from "@/lib/mongodb";

export async function testDatabaseConnection() {
  let isConnected = false;
  try {
    const client = await clientPromise;
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged NMitB. You successfully connected to MongoDB!");
    isConnected = true;
  } catch (e) {
    console.error(e);
  }
  return isConnected;
}
