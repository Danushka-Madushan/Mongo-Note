const { MongoClient } = require('mongodb')

const authURI = "mongodb+srv://env0ytuserdata:DPDMadushan123.@yt0cluster.la24r61.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(authURI);

const db = client.db("mongo-note");
const notes = db.collection("notes");

const InsertItem = async (id, data) => {
    try {
        const result = await notes.insertOne({_id: id, content: `${data}`});
        return {status: true, id:result.insertedId, message:'document Inserted'}
    } catch (err) {
        return {status: false, id, message:'uuid not Available'}
    }
}

const RemoveItem = async (id) => {
    const result = await notes.deleteOne({_id: id});

    if (result.deletedCount === 1) {
        return {status:true, id, message:"Successfully deleted one document."}
    } else {
        return {status:false, id, message:"No documents matched the query. Deleted 0 documents."}
    }
}

const RequestNotes = async () => {
    const cursor = notes.find({});
    return await cursor.toArray();
}

module.exports = { InsertItem, RemoveItem, RequestNotes }