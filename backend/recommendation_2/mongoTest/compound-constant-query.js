const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://admin-dipanwita:test123@cluster0.vafgqa3.mongodb.net/sample_mflix?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    await runMoreLikeThis();
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  } finally {
    client.close();
    console.log("Connection closed");
  }
}

async function runMoreLikeThis() {
  const collection = client.db("sample_mflix").collection("movies");

  const result = await collection
    .aggregate([
      {
        $search: {
          index: "godfather",
          text: {
            query: "godfather",
            path: "title",
          },
        },
      },
      { $limit: 10 }, // Optional: Limit the number of results
    ])
    .toArray();

  console.log("Similar movies:");
  result.forEach((doc) => {
    console.log(doc);
  });
}

main();
