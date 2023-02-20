const { MongoClient } = require('mongodb')
const express = require('express')
const router = express.Router()

const authURI = "mongodb+srv://env0ytuserdata:DPDMadushan123.@yt0cluster.la24r61.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(authURI);

const db = client.db("mongo-note");
const notes = db.collection("notes");

const InsertItem = async (id, data) => {
    const result = await notes.insertOne({_id: id, content: `${data}`});
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
}

const RemoveItem = async (id) => {
    const result = await notes.deleteOne({_id: id});

    if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
    } else {
        console.log("No documents matched the query. Deleted 0 documents.");
    }
}

const RequestNotes = async () => {
    const cursor = notes.find({});
    return await cursor.toArray();
}

router.get('/insert', (req, res) => {
    InsertItem('7d8328d8-680b-4782-8850-551a81b876f8', 'Alex is My Friend').catch(console.dir);
    res.status(200).send('OK')
})

router.get('/remove', (req, res) => {
    RemoveItem('7d8328d8-680b-4782-8850-551a81b876f8').catch(console.dir);
    res.status(200).send('OK')
})

router.get('/request', (req, res) => {
    RequestNotes().then((data) => {
        res.status(200).json(data)
    })
})

module.exports = router