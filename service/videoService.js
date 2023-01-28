const {findOneVideoHistory,updateOneSnapshot,updateOneVideo ,getOneSnapshot,getOneVideoDetail} = require('../repo/videoRepo');
module.exports ={
    addOrUpdateNewVideo: async function(videoData){
        if(!videoData["videoId"]){
            throw new Error("video id is necessary for add or update the video");
        }
        if(videoData["shouldUpdateSnapshot"]){
            delete videoData["shouldUpdateSnapshot"]
            if(!videoData["snaptime"]){
                throw new Error("snap time is necessary if shouldUpdateSnapshot is true");
            }
            videoDetails = await getOneVideoDetail({_id : videoData["videoId"]})
            if(videoDetails){
                videoId = videoData["videoId"]
                videoData["snaptime"] = Date.now();
                snapshotData = JSON.parse(JSON.stringify(videoData));
                delete videoData["videoId"];
                videoData["_id"] = videoId;
                snapshotData["_id"] = videoId+"_"+videoData["snaptime"];
                snapshotsavedata = await updateOneSnapshot(snapshotData);
                videosavedata = await  updateOneVideo(videoData);
                return {snapshotsavedata, videosavedata};
            }
            else{
                throw new Error("video data or video snap is not exists with is snapshot time or video id");
            }
        }
        else {
            delete videoData["shouldUpdateSnapshot"]
            videoDetails = await getOneVideoDetail({_id : videoData["videoId"]})
            !videoDetails && (videoData["snaptime"] = Date.now());
            videoId = videoData["videoId"]
            snapshotData = JSON.parse(JSON.stringify(videoData));
            delete videoData["videoId"];
            videoData["_id"] = videoId;
            snapshotData["_id"] = videoId + "_" + videoData["snaptime"];
            snapshotsavedata = await updateOneSnapshot(snapshotData);
            videosavedata = await  updateOneVideo(videoData);
            return {snapshotsavedata, videosavedata};
        }
    },
    getOneVideoHistory: async function(videoId){
        videoHistory =  await findOneVideoHistory({"videoId":videoId});
        return videoHistory;
    },
    getOneVidoeData : async function(videoId){
        videoDetails =  await getOneVideoDetail({"_id":videoId});
        return videoDetails;
    }
}