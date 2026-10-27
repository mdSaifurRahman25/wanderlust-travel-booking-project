import express from "express";
import { MongoClient } from 'mongodb';
import cors from 'cors'; 
import 'dotenv/config'; 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 


const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("You successfully connected to MongoDB!");
        return client;
    } catch (err) {
        console.dir(err);
    }
}

const mongoClient = await connectToMongoDB(); 
const db = mongoClient.db('WanderLust'); 
const destinationCollection = db.collection('destination')

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/add-destination", async (req, res) => {
    const data = req.body; 

    const result = await destinationCollection.insertOne(data); 
    console.log(result);
    // console.log(data,'from post method on server');
    res.json(result)
}); 

app.get("/destinations", async (req, res) => {
    const result = await destinationCollection.find().toArray(); 
    // console.log(result, 'from index.js and destination page.');
    res.send(result); 
})


app.listen(PORT, () => {
    console.log(`Server is running successfully at http://localhost:${PORT}`);
}); 