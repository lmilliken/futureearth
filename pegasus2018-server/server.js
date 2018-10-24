require("dotenv").config();
const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

const _ = require("lodash");
const multerClient = require("./utils/multer-client");
const ftpClient = require("./utils/ftp-client");
const mongoClient = require("./utils/mongo-client");
const emailClient = require("./utils/email-client");
const { authenticate } = require("./utils/authenticate");
const { Proposal } = require("./models/proposal");
const { Reviewer } = require("./models/reviewer");

const port = process.env.PORT || 8081;
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log(
    `Server is up on port ${port}.  Environment: ${process.env.NODE_ENV}`
  );
});

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB2);
app.use(express.static("./public"));

app.post("/reviewers/addReview", authenticate, (req, res) => {
  console.log(req.body);
  console.log(req.Reviewer.ContactKey);
  mongoClient
    .addReview(req)
    .then(res.send("this is working"))
    .catch(err => {
      res.statusMessage =
        "Sorry, an error was encountered while saving your application (Email Client): " +
        err;
      res.status(400).end();
    });
});

app.get("/reviewers/completed", authenticate, (req, res) => {
  mongoClient
    .getCompletedReviews(req.Reviewer.ContactKey)
    .then(applications => {
      res.send({
        applications
      });
    })
    .catch();
});

app.get("/reviewers/assigned", authenticate, (req, res) => {
  // console.log("new request: ", req);
  console.log("reviewer id in here: ", req.Reviewer._id);
  Proposal.find({ assignedReviewers: req.Reviewer._id }).then(returned => {
    console.log("returned proposals:", returned), res.send(returned);
  });

  // mongoClient
  //   .getAssignedReviews(req.Reviewer.ContactKey)
  //   .then(applications => {
  //     res.send({
  //       reviewer: req.Reviewer,
  //       assignedReviews: applications
  //     });
  //   })
  //   .catch();
});

app.post("/adminupdate/:id", (req, res) => {
  console.log("post called", req.params.id);
  console.log("post called", req.body);
  var body = _.pick(req.body, ["assignedReviewers", "tags", "notes"]);
  Proposal.findOneAndUpdate(
    { _id: req.params.id },
    { $set: body },
    { new: true }
  ).then(updatedProposal => {
    console.log({ updatedProposal });
    res.send(updatedProposal);
  });
  // mongoClient
  //   .saveAssignment(req)
  //   .then(res.send("this is working"))
  //   .catch(err => {
  //     res.statusMessage =
  //       "Sorry, an error was encountered while saving your application (Email Client): " +
  //       err;
  //     res.status(400).end();
  //   });
});

// it's a little messy, can't do Promise.all because the next function needs output from previous function, can do async/await but need to work on try/catch blocks for them
app.post("/submit", (req, res) => {
  multerClient
    .uploadLocal(req, res)
    .then(returned => {
      if (returned == "Invalid File") {
        res.statusMessage =
          "The file(s) you submitted are invalid.  Please only upload only .pdf documents.";
        res.status(401).end();
      } else {
        ftpClient
          .upload(req)
          .then(() => {
            let thisProposal = new Proposal();
            thisProposal
              .parseAndSave(req)
              .then(result => {
                console.log({ result });
                emailClient
                  .sendEmail(result)
                  .then(res.send("done! email sent"))
                  .catch(err => {
                    res.statusMessage =
                      "Sorry, an error was encountered while saving your application (Email Client): " +
                      err;
                    res.status(400).end();
                  });
              })
              .catch(err => {
                res.statusMessage =
                  "Sorry, an error was encountered while saving your application (Mongo): " +
                  err;
                res.status(400).end();
              });
          })
          .catch(err => {
            res.statusMessage =
              "Sorry, an error was encountered while uploading your files (FTP): " +
              err;
            res.status(400).end();
          });
      } //else
    })
    .catch(err => {
      res.statusMessage =
        "Sorry, an error was encountered while processing your application (Multer): " +
        err;
      res.status(400).end();
    });
});

// app.get("/proposals", (req, res) => {
//   mongoClient.getProposals().then(proposals => {
//     res.send(proposals);
//   });
// });

app.get("/proposals", (req, res) => {
  Proposal.find({}).then(proposals => {
    res.send(proposals);
  });
});

app.get("/reviewers", (req, res) => {
  Reviewer.find({}).then(reviewers => {
    res.send(reviewers);
  });
});
