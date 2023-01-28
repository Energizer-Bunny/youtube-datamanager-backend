const { getDb } = require("../connectionClients/mongoClient");
const commonOperation = require("./commonOperation");

module.exports =  {
    findOneVideoHistory : async function(query) {
        return commonOperation.findAllByQuery("videoSnapshot",query);
    },
    updateOneSnapshot : async function(query) {
        return commonOperation.updateOneByQuery("videoSnapshot" ,{"_id":query["_id"]}, query);
    },
    updateOneVideo : async function(query) {
        return commonOperation.updateOneByQuery("videoData" , {"_id":query["_id"]} , query);
    },
    getOneSnapshot : async function(query){
        return commonOperation.findOne("videoSnapshot",query);
    },
    getOneVideoDetail : async function (query){
        return commonOperation.findOne("videoData",query);
    },
    getOneVideoData : async function(query){
        return commonOperation.findOne("videoData", query);
    }
}