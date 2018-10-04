require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const port = process.env.PORT || 8081;
let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

const util = require("util");

app.get("/mtl-consortium-search", (req, res) => {
  // console.log("called params", req.query);
  let queryParams;
  if (!req.query.keywords && !req.query.themes && !req.query.leads) {
  } else {
    queryParams = { $or: [] };
    let themes = [];
    if (req.query.themes) {
      themes = req.query.themes.map(item => {
        let obj = {};
        let thisItem = JSON.parse(item);
        obj[thisItem.value] = 1;
        queryParams.$or.push(obj);
      });

      // console.log(typeof queryParams.$or);
      // queryParams.$or.push({ something: "something" });
      console.log(
        util.inspect(queryParams, false, null, true /* enable colors */)
      );
      // console.log({ queryParams });
    }
  }

  // res.send("this is your response");
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
        .find(queryParams)
        .toArray()
        .then(function(returned) {
          res.send(returned);
        });
    }
  );
});

// app.get("/mtl-consortium", (req, res) => {
//   console.log("called", process.env.DB);
//   MongoClient.connect(
//     process.env.DB,
//     { useNewUrlParser: true },
//     function(err, client) {
//       const db = client.db("fe");
//       if (err) {
//         console.log(err);
//         return res.end("somethings's wrong");
//       }
//       console.log("connected");
//       db.collection("mtl-consortium")
//         .find()
//         .toArray()
//         .then(function(returned) {
//           res.send(returned);
//         });
//     }
//   );
// });
