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

app.get("/mtl-consortium-search", (req, res) => {
  // console.log("called params", req.query);

  let themes = [];
  if (req.query.themes) {
    themes = req.query.themes.map(item => {
      let obj = {};
      let thisItem = JSON.parse(item);
      // console.log(thisItem.value);
      let themeKey = thisItem.value;
      obj[thisItem.value] = 1;
      return obj;
    });
  }
  console.log({ themes });
  res.send("this is your response");
  // MongoClient.connect(
  //   process.env.DB,
  //   { useNewUrlParser: true },
  //   function(err, client) {
  //     const db = client.db("fe");
  //     if (err) {
  //       console.log(err);
  //       return res.end("somethings's wrong");
  //     }
  //     console.log("connected");
  //     db.collection("mtl-consortium")
  //       .find()
  //       .toArray()
  //       .then(function(returned) {
  //         res.send(returned);
  //       });
  //   }
  // );
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
