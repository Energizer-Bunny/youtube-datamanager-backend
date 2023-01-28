const express = require('express');
const {addOrUpdateNewVideo , getOneVideoHistory , getOneVidoeData} = require('../service/videoService');
const router = express.Router();

router.post('/addOrUpdateVideo', (req, res, next) => {
    let params = req.body;
    addOrUpdateNewVideo(params).then(savedata=>{
        res.status(200).json({"data_in_mongo" : savedata})
    }).catch(err =>{
        res.status(400).json({"error":err.message})
    })
});

router.get('/getOneVideoHistory', (req,res,next) =>{
    let videoId = req.query.videoId;
    getOneVideoHistory(videoId).then(videoHistoryData=>{
        res.status(200).json({"videoHistoryData" : videoHistoryData})
    }).catch(err =>{
        res.status(400).json({"error":err.message})
    })
});

router.get('/getOneVideoData', (req,res,next)=>{
    let videoId = req.query.videoId;
    getOneVidoeData(videoId).then(youtubeData=>{
        res.status(200).json({"youtubeData" : youtubeData})
    }).catch(err =>{
        res.status(400).json({"error":err.message})
    })
})
module.exports = router;