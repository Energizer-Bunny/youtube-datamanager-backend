const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const urlRoutes = routes.routes();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
for(var i in urlRoutes){
    app.use(urlRoutes[i].url,urlRoutes[i].route);
}

app.use((req,res,next)=>{
    res.status(404).json({
        message : "Sorry, this page does not exists"
    })
});

module.exports = app;