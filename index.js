const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = 3000;

//
app.use(cors());
app.use(express.json());

//mongodb

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.os5glhw.mongodb.net/?appName=Cluster0`;

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
    const bookingCollection = db.collection("bookings")
    //to get all services
    app.get("/services", async (req, res) => {
      const result = await serviceCollection.find().toArray();
      res.send(result);
    });

    //to add services
    app.post("/services", async (req, res) => {
      const data = req.body;
      // console.log(data);
      const result = await serviceCollection.insertOne(data);

      res.send({
        success: true,
        result,
      });
    });
    //to add bookings
    app.post("/bookings", async (req, res) => {
      const data = req.body;
      // console.log(data);
      const result = await bookingCollection.insertOne(data);

      res.send({
        success: true,
        result,
      });
    });

    //to get single data
    app.get("/services/:id", async (req, res) => {
      const { id } = req.params;
      console.log(id);
      const result = await serviceCollection.findOne({ _id: new ObjectId(id) });

      res.send({
        success: true,
        result,
      });
    });

    //to get in my services page
    app.get("/my-services", async(req,res)=>{
      const email = req.query.email
      const result = await serviceCollection.find({providerEmail: email}).toArray()
      res.send(result)
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
