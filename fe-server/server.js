require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const port = process.env.PORT || 8081;
let app = express();
app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

app.get("/mtl-consortium", (req, res) => {
  console.log("called", process.env.DB);
  MongoClient.connect(
    process.env.DB,
    { useNewUrlParser: true },
    function(err, client) {
      const db = client.db("fe");
      if (err) {
        console.log(err);
        return res.end("somethings's wrong");
      }
      console.log("connected");
      db.collection("mtl-consortium")
        .find()
        .toArray()
        .then(function(returned) {
          res.send(returned);
        });
    }
  );
});
