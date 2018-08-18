const express = require('express')

const Client = require('ftp')
const fs = require('fs')

var cors = require('cors');
var bodyParser  = require('body-parser');
const multer = require('multer');
const path = require('path')
//Set Storage Enginee
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb){
        cb(null, req.body.lastName[0] + '_' + file.fieldname.substring(6) + '-' + Date.now() + path.extname(file.originalname))
    }
})

var ftpClient = new Client();



ftpClient.connect({
    host: "ftp.laurelmilliken.com",
    port: 21,
    user: "pegasus2018@laurelmilliken.com",
    password: "Back2Future18"
}, (err)=>{console.log(err)})


//Init Upload
const upload = multer({
    storage: storage
}).fields([{name: "uploadProposal"}, {name: "uploadBudget"}])


const port = process.env.PORT || 8081; 

var app = express();
//Public Folder
app.use(express.static('./public'))
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/submit', upload.any(), (req, res)=>{

app.post('/submit', (req, res)=>{
   // console.log("here is the request: ", req)
    upload(req, res, (err)=>{
        if(err){
            console.log('error you fool! ', err)
        } else {
            console.log("fields: ", req.body) 

            // var proposalFileOrigin = req.files.uploadProposal[0].path;
            // var proposalFileDest = req.files.uploadProposal[0].filename;
            // var budgetFileOrigin = req.files.uploadBudget[0].path;
            // var budgetFileDest = req.files.uploadBudget[0].filename;

            // ftpClient.connect({
            //     host: "ftp.laurelmilliken.com",
            //     port: 21,
            //     user: "pegasus2018@laurelmilliken.com",
            //     password: "Back2Future18"
            // }, (err)=>{console.log(err)})

            // ftpClient.on('ready', function() {
            //     ftpClient.put( proposalFileOrigin, proposalFileDest, function(err) {
            //       if (err) throw err;
            //       ftpClient.end();
            //     });

            //     ftpClient.put( budgetFileOrigin, budgetFileDest, function(err) {
            //         if (err) throw err;
            //         ftpClient.end();
            //     });
            //   });             
        }
    })
//req.files.uploadProposal[0].filename
    res.send('OK')
    // uploadProposal(req,res, (err)=>{
    //     if(err){
    //         console.log('error you fool! ', err)
    //     } else {
    //         console.log(req)
    //         res.send('test')
    //     }
    // })

    // uploadBudget(req,res, (err)=>{
    //     if(err){
    //         console.log('error you fool! ', err)
    //     } else {
    //         console.log(req)
    //         res.send('test')
    //     }
    // })
});

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
    // console.log(process.env)
});