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

  axios(authOptions)
    .then(returned => {
      //   console.log("returned: ", returned);
      req.Reviewer = returned.data;
      req.FirstName = returned.data.FirstName;
      req.LastName = returned.data.LastName;
      mongoClient
        .findUser(req.Reviewer.ContactKey)
        .then(confirmedContactKey => {
          console.log("user confirmed");
          next();
        })
        .catch(e => {
          console.log("error in authenticate.js", e);
          res.send(e);
        });
      //   next();
    })
    .catch(err => {
      console.log("there is an error", err), this.setState({ statusOK: false });
    });

  //   User.findByToken(token)
  //     .then(user => {
  //       if (!user) {
  //         return Promise.reject();
  //       }
  //       req.user = user;
  //       req.token = token;
  //       next();
  //     })
  //     .catch(e => {
  //       res.status(401).send();
  //     });
};

module.exports = { authenticate };
