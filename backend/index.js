import express from "express";
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 8000;

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

app.put("/destinations/:id", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid destination ID." });
    }

    const {
        destinationName,
        country,
        category,
        price,
        duration,
        departureDate,
        imageUrl,
        description,
    } = req.body;

    if (
        typeof destinationName !== "string" ||
        typeof country !== "string" ||
        typeof category !== "string" ||
        typeof price !== "number" ||
        !Number.isFinite(price) ||
        price < 0 ||
        typeof duration !== "string" ||
        typeof departureDate !== "string" ||
        typeof imageUrl !== "string" ||
        typeof description !== "string"
    ) {
        return res.status(400).json({ message: "Invalid destination data." });
    }

    try {
        const result = await destinationCollection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    destinationName,
                    country,
                    category,
                    price,
                    duration,
                    departureDate,
                    imageUrl,
                    description,
                },
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Destination not found." });
        }

        const destination = await destinationCollection.findOne({
            _id: new ObjectId(id),
        });

        return res.json({ result: destination });
    } catch (error) {
        console.error("Failed to update destination:", error);
        return res.status(500).json({ message: "Failed to update destination." });
    }
});

app.get("/destinations", async (req, res) => {
    const result = await destinationCollection.find().toArray();
    // console.log(result, 'from index.js and destination page.');
    res.send(result);
});


app.get("/destinations/:id", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid destination ID." });
    }

    try {
        const result = await destinationCollection.findOne({ _id: new ObjectId(id) });

        if (!result) {
            return res.status(404).json({ message: "Destination not found." });
        }

        return res.json({ result });
    } catch (error) {
        console.error("Failed to fetch destination:", error);
        return res.status(500).json({ message: "Failed to fetch destination." });
    }
});

app.patch("/destinations/:id", async (req, res) => {
    // const {id} = req.params; 
    const id = req.params.id; // collecting id from URL endpoint
    const data = req.body; // collecting new data from frontend Form 

    const result = await destinationCollection.updateOne(
        {_id: new ObjectId(id)},
        {$set: data}
    ); 
    res.send(result); 
});

app.delete("/destinations/:id", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid destination ID." });
    }

    try {
        const result = await destinationCollection.deleteOne({
            _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Destination not found." });
        }

        return res.json(result);
    } catch (error) {
        console.error("Failed to delete destination:", error);
        return res.status(500).json({ message: "Failed to delete destination." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running successfully at http://localhost:${PORT}`);
}); 