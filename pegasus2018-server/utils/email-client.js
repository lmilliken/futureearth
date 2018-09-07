const nodemailer = require("nodemailer");
require("dotenv").config();
let { google } = require("googleapis");
let OAuth2 = google.auth.OAuth2;
const util = require("util");

let sendEmail = requestObject => {
  return new Promise((resolve, reject) => {
    let investigatorsList = "";

    requestObject.investigators.map(person => {
      investigatorsList += `<p>
          First name: ${person.firstName} <br>
          Last name: ${person.lastName} <br>
          Email: ${person.email} <br>
          Institution: ${person.institution} <br>
          Country of Citizenship: ${person.countryCitizenship} <br>
          Country of Work: ${person.countryWork}
          </p>`;
    });

    // console.log(investigatorsList)

    let oauth2Client = new OAuth2(
      "627884285375-s4ke7iuha947pv7e4fj6e07frjaqifjq.apps.googleusercontent.com",
      "oJrMBwLCAOk5k9iWCFA1qY9A",
      //redirect URL
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.EMAIL_REFRESH_TOKEN
    });

    let accessToken = "";
    oauth2Client.refreshAccessToken((err, tokens) => {
      accessToken = tokens.accessToken;
    });

    let smtpTransport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    var message = {
      from: process.env.EMAIL_USER,
      to: requestObject.investigators[0].email,
      subject: "PEGASuS Application Received",
      // text: 'this is some text',
      html:
        "<p>Hello,</p>" +
        `<p>Thank you for submitting your proposal.  Below are the details of your submission.  If you have any questions, please contact Craig Starger, the PEGASuS Program Manager, at craig.starger@futureearth.org</a>. </p>` +
        `<p><strong>Title</strong>: ${requestObject.title}</p>` +
        `<p><strong>Investigators</strong>:</p>` +
        investigatorsList +
        `Proposal:  <a href="${requestObject.linkToProposal}">${
          requestObject.proposalName
        }</a>` +
        `<br>Budget:  <a href="${requestObject.linkToBudget}">${
          requestObject.budgetName
        }</a>`
    };

    smtpTransport.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve("SUCCESS!");
      }
    });
  });

  //   console.log(util.inspect(requestObject, false, null));
};

// var requestObject = {
//     title: 'Greatest Proposal Ever',
//     investigators:
//     [ { firstName: 'Penny',
//         lastName: 'Lane',
//         email: 'penny@mail.com',
//         institution: 'Liverpool',
//         countryCitizenship: 'Uganda',
//         countryWork: 'Kazakhstan' },
//     { firstName: 'Jude',
//         lastName: 'McCarthney',
//         email: 'jude@mail.com',
//         institution: 'McGill',
//         countryCitizenship: 'Iceland',
//         countryWork: 'Afghanistan' },
//     { firstName: 'Marcus',
//         lastName: 'Titus',
//         email: 'marc@mail.com',
//         institution: 'Rome',
//         countryCitizenship: 'Laos',
//         countryWork: 'Kenya' } ],
//     proposalName: 'FrontierBoarding.pdf',
//     budgetName: 'FrontierBoarding.pdf',
//     linkToProposal:
//     'http://apply.futureearth.org/pegasus2018/Lane_Proposal-1535267085376.pdf',
//     linkToBudget:
//     'http://apply.futureearth.org/pegasus2018/Lane_Budget-1535267085383.pdf',
//     agreed: 1535267089247,
//     // _id: 5b825111d68e8213607e8027
//     }

module.exports = { sendEmail };
