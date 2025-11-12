const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = 3000;

//
app.use(cors());
app.use(express.json());

//mongodb

const uri =
  "mongodb+srv://home-hero-db:e62NRJB5Rl3Kcdnk@cluster0.os5glhw.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db("home-hero-db");
    const serviceCollection = db.collection("services");
    //
    app.get('/services', async(req,res)=>{
        const result = await serviceCollection.find().toArray();
      res.send(result);
    })




// 
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Home-Hero's Server is Running!");
});

//
app.listen(port, () => {
  console.log(`Server is listening on2 port ${port}`);
});
