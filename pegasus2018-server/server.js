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
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

//Init Upload
const upload = multer({
    storage: storage
})

const port = process.env.PORT || 8081; 

var app = express();
//Public Folder
app.use(express.static('./public'))
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


app.post('/submit', upload.any(), (req, res)=>{
    console.log(req)
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
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
});