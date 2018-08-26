require('dotenv').config();
const express = require('express')
var cors = require('cors');
var bodyParser = require('body-parser')


var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

const multerClient = require('./utils/multer-client')
const ftpClient = require('./utils/ftp-client')
const mongoClient = require('./utils/mongo-client')
const emailClient = require('./utils/email-client')


const port = process.env.PORT || 8081; 
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
});

//Public Folder, not sure what this is for, but it's needed
app.use(express.static('./public'))


// app.post('/submit', upload.any(), (req, res)=>{
app.post('/submit', (req, res)=>{
    console.log("body", req.body)    
    reqBody = {}

    multerClient.uploadLocal(req,res)
    .then(()=>{
        console.log("files", req.files);
        console.log("body", req.body);
        console.log('about to get file from local to ftp')
        ftpClient.upload(req)
            .then((ftpresult)=>{
                console.log('ftp promise resolved', ftpresult)
                mongoClient.saveToDB(req)
                .then((result)=>{
                    emailClient.sendEmail(result.returned.ops)
                    res.send("ok"),
                    console.log('result of MongoClient', result)
                })               
            });}        
    ).catch((error)=>{
        console.log(err);
        return res.send("something when wrong")
    })
})

