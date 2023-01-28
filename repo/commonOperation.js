const { getDb } = require("../connectionClients/mongoClient");
const { ObjectID } = require('mongodb');
const { query } = require("express");

const commonOperation = {
    insertOne: async function (collectionName, doc) {
        let db = await getDb();
        return db.collection(collectionName).insertOne(doc);
    },
    /***
     * updateOne by _id 
     */
    updateOne: async function (collectionName, _id, updateQuery) {
        updateQuery["updatedAt"] = Date.now();
        let db = await getDb();
        return db.collection(collectionName).updateOne({ "_id": new ObjectID(_id) }, { "$set": updateQuery }, { upsert: true });
    },
    updateOneByQuery: async function (collectionName, findQuery, updateQuery) {
        updateQuery["updatedAt"] = Date.now();
        let db = await getDb();
        return db.collection(collectionName).updateOne(findQuery, { "$set": updateQuery }, { upsert: true });
    },
    deleteOne: async function (collectionName, query) {
        let db = await getDb();
        return db.collection(collectionName).deleteOne(query);
    },
    findOne: async function (collectionName, query) {
        let db = await getDb();
        return db.collection(collectionName).findOne(query);
    },
    findAllByQuery : async function (collectionName , findQuery) {
        let db = await getDb();
        x = await db.collection(collectionName).find(findQuery).sort({"updatedAt" : -1}).toArray();
        return x;
    }
}

module.exports = commonOperation;