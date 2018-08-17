const express = require('express')
const fs = require('fs')
var cors = require('cors');
var bodyParser  = require('body-parser');

const port = process.env.PORT || 8081; 

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res)=>{
    console.log("salsa is here: " , req.body)
    console.log("type of file: ", typeof req.body.uploadProposal)
    res.send('OK')
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
});