const { MongoClient } = require('mongodb');
const config = require('../config.js')
const url = config.MONGO_URI;
 
let connection = undefined;
async function getDb() {
   if (!connection) {
       const client = new MongoClient(url,
           { useNewUrlParser: true, useUnifiedTopology: true });
       connection = await client.connect();
   }
 
   return connection.db();
}
 
async function getSession() {
   if (!connection) {
       let client = new MongoClient(url,
           { useNewUrlParser: true, useUnifiedTopology: true });
       connection = await client.connect();
   }
 
   let session = connection.startSession();
   session.startTransaction({
       defaultTransactionOptions: {
           readConcern: { level: 'local' },
           writeConcern: { w: 'majority' },
           readPreference: 'primary'
       }
   });
 
   return session;
}
module.exports = {getDb , getSession};

