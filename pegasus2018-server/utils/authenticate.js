const axios = require("axios");
const mongoClient = require("./mongo-client");

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
      // console.log("axios call to HL successfull ", returned);
      req.Reviewer = returned.data;
      req.FirstName = returned.data.FirstName;
      req.LastName = returned.data.LastName;
      mongoClient
        .findUser(req.Reviewer.ContactKey)
        .then(confirmedUser => {
          if (confirmedUser.length < 1) {
            res.statusMessage = "You are not authorized to view this page";
            res.status(501).send();
          }
          next();
        })
        .catch(err => {
          // console.log("find user failed");
          console.log("Laurel, error: ", err);
          res
            .status(500)
            .send(
              "Authentication via Higher Logic failed.  Please contact Laurel."
            );
        });
    })
    .catch(err => {
      console.log("Laurel, error from HL", err.response.data.Message);
      res.statusMessage = `An error was encountered with Higher Logic authentication.  Please see Laurel. ${
        err.response.data.Message
      }`;
      res.status(403).send();
    });
};

module.exports = { authenticate };
