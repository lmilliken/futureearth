const express = require('express')
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
            console.log("fields: ", req)   
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
});