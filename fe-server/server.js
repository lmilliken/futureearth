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

    if (req.query.keywords) {
      queryParams.$or.push({ $text: { $search: req.query.keywords } });
    }

    if (req.query.themes) {
      req.query.themes.map(item => {
        let obj = {};
        let thisItem = JSON.parse(item);
        obj[thisItem.value] = 1;
        queryParams.$or.push(obj);
      });
      // console.log(typeof queryParams.$or);
      // queryParams.$or.push({ something: "something" });

      // console.log({ queryParams });
    }
    if (req.query.leads) {
      let leadArray = [];
      leads = req.query.leads.map(lead => {
        let item = JSON.parse(lead);
        leadArray.push(item.value);
      });
      console.log({ leadArray });
      queryParams.$or.push({ LEAD_INST: { $in: leadArray } });
    }

    console.log(
      util.inspect(queryParams, false, null, true /* enable colors */)
    );
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
