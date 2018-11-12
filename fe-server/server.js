require('dotenv').config();
require('./config/config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
// var { mongoose } = require('./db/mongoose');
const { mongoose } = require('./db/mongoose');
const { Member } = require('./models/mtl-member');

const port = process.env.PORT || 8081;
let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

const util = require('util');

app.get('/mtl-consortium-search', (req, res) => {
  console.log('environment: ', process.env.NODE_ENV);
  // console.log("called params", req.query);
  let queryParams;
  if (!req.query.keywords && !req.query.themes && !req.query.leads) {
  } else {
    queryParams = { $or: [] };

    if (req.query.keywords) {
      queryParams.$or.push({ $text: { $search: req.query.keywords } });
    }

    if (req.query.themes) {
      req.query.themes.map((item) => {
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
      leads = req.query.leads.map((lead) => {
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

  Member.find({})
    .then(
      (members) => {
        res.send({ members });
      },
      (e) => {
        res.status(400).send(e);
      }
    )
    .catch((e) => console.log(e));
  // res.send("this is your response");
  // MongoClient.connect(
  //   process.env.DB,
  //   { useNewUrlParser: true },
  //   function(err, client) {
  //     const db = client.db('fe');
  //     if (err) {
  //       console.log(err);
  //       return res.end("somethings's wrong");
  //     }
  //     console.log('connected');
  //     db.collection('mtl-consortium')
  //       .find(queryParams)
  //       .sort({ INST_NAME: 1 })
  //       .toArray()
  //       .then(function(returned) {
  //         res.send(returned);
  //       });
  //   }
  // );
});

app.get('/mtl-consortium', (req, res) => {
  console.log('called', process.env.DB);
  MongoClient.connect(
    process.env.DB,
    { useNewUrlParser: true },
    function(err, client) {
      const db = client.db('fe');
      if (err) {
        console.log(err);
        return res.end("somethings's wrong");
      }
      console.log('connected');
      db.collection('mtl-consortium')
        .find()
        .toArray()
        .then(function(returned) {
          res.send(returned);
        });
    }
  );
});
module.exports = { app };
