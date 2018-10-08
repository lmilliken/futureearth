var MongoClient = require("mongodb");
var ObjectId = require("mongodb").ObjectID;

let parentFtpDirectory = "http://apply.futureearth.org/pegasus2018/";
let dbCollection = "pegasus2018-playground";

let saveAssignment = req => {
  return new Promise((resolve, reject) => {
    console.log("assigned reviewers: ", req.body.reviewers);
    MongoClient.connect(
      process.env.DB,
      function(err, client) {
        if (err) {
          reject("Could not connect to MongoDB: ", err);
        } else {
          console.log("successfully connected");
          var db = client.db("fcc-lxm");
          db.collection("pegasus2018-playground")
            .update(
              { _id: ObjectId(req.params.id) },
              {
                $set: {
                  assignedReviewers: req.body.reviewers,
                  tags: req.body.tags,
                  notes: req.body.notes
                }
              },
              {
                upsert: false
              }
            )
            .then(function(returned) {
              console.log("successfully saved assignment ", returned);
              resolve({ returned });
              //send them an email confirmation
            });
        }
      }
    ); //MongoClient
  });
};

var saveToDB = req => {
  let objectToSave = {
    title: req.body.title,
    investigators: [],
    proposalName: req.files.uploadProposal[0].originalname,
    budgetName: req.files.uploadBudget[0].originalname,
    linkToProposal: parentFtpDirectory + req.files.uploadProposal[0].filename,
    linkToBudget: parentFtpDirectory + req.files.uploadBudget[0].filename,
    agreed: Date.now()
  };

  //maybe clean up
  if (req.body.firstName.isArray) {
    //map instead? not really since
    for (i = 0; i < req.body.firstName.length; i++) {
      objectToSave.investigators.push({
        firstName: req.body.firstName[i],
        lastName: req.body.lastName[i],
        email: req.body.email[i],
        institution: req.body.institution[i],
        countryCitizenship: req.body.countryCitizenship[i],
        countryWork: req.body.countryWork[i]
      });
    }
  } else {
    objectToSave.investigators.push({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      institution: req.body.institution,
      countryCitizenship: req.body.countryCitizenship,
      countryWork: req.body.countryWork
    });
  }

  return new Promise((resolve, reject) => {
    MongoClient.connect(
      process.env.DB,
      function(err, client) {
        if (err) {
          reject("Could not connect to MongoDB: ", err);
        } else {
          console.log("successfully connected");
          var db = client.db("fcc-lxm");
          db.collection(dbCollection)
            .insertOne(objectToSave)
            .then(function(returned) {
              // console.log(returned);
              resolve({ returned });
              //send them an email confirmation
            });
        }
      }
    ); //MongoClient
  });
};

var getProposals = req => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      process.env.DB,
      function(err, client) {
        if (err) {
          reject("Could not connect to MongoDB: ", err);
        } else {
          var db = client.db("fcc-lxm");
          db.collection("pegasus2018-playground")
            .find()
            .toArray()
            .then(returnedStuff => {
              // console.log("returned", returnedStuff);
              resolve({ returnedStuff });
            });
        }
      }
    ); //MongoClient
  });
};

var getReviewers = req => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      process.env.DB,
      function(err, client) {
        if (err) {
          reject("Could not connect to MongoDB: ", err);
        } else {
          var db = client.db("fcc-lxm");
          db.collection("pegasus2018-reviewers")
            .find()
            .toArray()
            .then(returnedStuff => {
              // console.log("returned reviewers", returnedStuff);
              resolve({ returnedStuff });
            });
        }
      }
    ); //MongoClient
  });
};

module.exports = { saveToDB, getProposals, getReviewers, saveAssignment };
