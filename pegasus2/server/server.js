const express = require('express')
const http = require('http')
const path = require('path')
//var cors        = require('cors');
const publicPath = path.join(__dirname, '../public')
const app = express();
//var server = http.createServer(app)
app.use(express.static(publicPath))
//app.use(cors({origin: '*'}));
app.use(function(req, res, next) {
    res.set({
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Headers" : "Origin, X-Requested-With, content-type, Accept"
    });
    app.disable('x-powered-by');
    next();
  });
const port = process.env.PORT || 3000;

app.get('/applicationform', (req, res)=>{
    res.sendFile(publicPath + '/applicationform.html')
})


app.listen(port, ()=>{
    console.log(`Started on port ${port}`)
})