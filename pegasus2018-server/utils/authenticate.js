const axios = require("axios");
const mongoClient = require("./mongo-client");
const { Reviewer } = require("./../models/reviewer");

var authenticate = async (req, res, next) => {
  var authOptions = {
    method: "GET",
    url: "https://api.connectedcommunity.org/api/v2.0/Contacts/GetWhoAmI",
    withCredentials: true,
    headers: {
      HLIAMKey: process.env.HL_KEY,
      HLAuthToken: req.header("HLAuthToken")
    }
  };
  console.log("in authenticate.js");

  axios(authOptions)
    .then(returned => {
      console.log("axios call to HL successfull ");
      //error code 422? look into this 500s: when express server crashes, 400s: "client" error
      req.Reviewer = returned.data;
      req.FirstName = returned.data.FirstName;
      req.LastName = returned.data.LastName;
      Reviewer.find({ HLContactKey: req.Reviewer.ContactKey })
        .then(confirmedUser => {
          if (confirmedUser.length < 1) {
            res.statusMessage = "You are not authorized to view this page";
            res.status(401).send();
          }
          req.Reviewer._id = confirmedUser[0]._id;
          console.log("reviewer: ", req.Reviewer._id);
          next();
        })
        .catch(err => {
          // console.log("find user failed");
          console.log("Laurel, error: ", err);
          res
            .status(400)
            .send(
              "Authentication via Higher Logic failed.  MongoDB issue. Please contact Laurel."
            );
        });
    })
    .catch(err => {
      console.log("Laurel, error from HL", err);
      res.statusMessage = `An error was encountered with Higher Logic authentication.  Please see Laurel. ${
        err.response.data.Message
      }`;
      res.status(403).send();
    });

  //err && err.response && err.response.data....|| 'unknown error'
};

module.exports = { authenticate };
