require("dotenv").config();
const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

const multerClient = require("./utils/multer-client");
const ftpClient = require("./utils/ftp-client");
const mongoClient = require("./utils/mongo-client");
const emailClient = require("./utils/email-client");

const port = process.env.PORT || 8081;
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

app.use(express.static("./public"));

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
            mongoClient
              .saveToDB(req)
              .then(result => {
                emailClient
                  .sendEmail(result.returned.ops[0])
                  .then(res.send("ok"))
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

  //   multerClient
  //     .uploadLocal(req, res)
  //     .then(() => {
  //       console.log("files", req.files);
  //       console.log("body", req.body);
  //       console.log("about to get file from local to ftp");
  //       ftpClient.upload(req).then(ftpresult => {
  //         console.log("ftp promise resolved", ftpresult);
  //         mongoClient.saveToDB(req).then(result => {
  //           emailClient.sendEmail(result.returned.ops[0]);
  //           res.send("ok"), console.log("result of MongoClient", result);
  //         });
  //       });
  //     })
  //     .catch(error => {
  //       console.log(err);
  //       return res.send("something when wrong", err);
  //     });
});
