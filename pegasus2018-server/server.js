require('dotenv').config();
const express = require('express')
var cors = require('cors');
const multer = require('multer');
const path = require('path')
const Client = require('ftp')

const fs = require('fs')
var bodyParser  = require('body-parser');


const port = process.env.PORT || 8081; 
var app = express();
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//Public Folder
app.use(express.static('./public'))

//Set Storage Enginee
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb){
        cb(null, req.body.lastName[0] + '_' + file.fieldname.substring(6) + '-' + Date.now() + path.extname(file.originalname))
    }
})
//Init Upload
const upload = multer({
    storage: storage
}).fields([{name: "uploadProposal"}, {name: "uploadBudget"}])




// app.post('/submit', upload.any(), (req, res)=>{
app.post('/submit', (req, res)=>{
    // console.log("fields: ", req.body) 
    // res.send("end")
   upload(req, res, (err)=>{
        if(err){
            return res.send('error you fool! ', err)
        } else {
            console.log("fields: ", req.body) 
            
            var proposalFileOrigin = req.files.uploadProposal[0].path;
            var proposalFileDest = req.files.uploadProposal[0].filename;
            var budgetFileOrigin = req.files.uploadBudget[0].path;
            var budgetFileDest = req.files.uploadBudget[0].filename;
            
            var ftpClient = new Client();
            ftpClient.connect({
                host: process.env.FTP_HOST,
                port: process.env.FTP_PORT,
                user: process.env.FTP_USER,
                password: process.env.FTP_PASSWORD
            }, (err)=>{
                console.log('error connecting to ftp server: ', err)})

            ftpClient.on('ready', function() {
                console.log("in ready")
                ftpClient.put( proposalFileOrigin, proposalFileDest, function(err) {
                    console.log("proposal file uploaded")
                    if (err) throw err;
                  ftpClient.put( budgetFileOrigin, budgetFileDest, function(err) {
                    if (err) throw err;
                    console.log("budget file uploaded")
                    ftpClient.end()
                    console.log("connection ended?")    
                    });
                });
              });   

              ftpClient.on('end', function(){
                console.log("connection definitely ended")
                return res.send("OK")})      
            }
        })
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
    // console.log(process.env)
});