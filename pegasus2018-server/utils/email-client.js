const nodemailer = require('nodemailer');
require('dotenv').config();
let {google} = require('googleapis');
let OAuth2 = google.auth.OAuth2;
const util = require('util');

var sendEmail = (req) => {
    console.log(util.inspect(req, false, null))

}

var requestObject = { 
    title: 'Greatest Proposal Ever',
    investigators:
    [ { firstName: 'Penny',
        lastName: 'Lane',
        email: 'penny@mail.com',
        institution: 'Liverpool',
        countryCitizenship: 'Uganda',
        countryWork: 'Kazakhstan' },
    { firstName: 'Jude',
        lastName: 'McCarthney',
        email: 'jude@mail.com',
        institution: 'McGill',
        countryCitizenship: 'Iceland',
        countryWork: 'Afghanistan' },
    { firstName: 'Marcus',
        lastName: 'Titus',
        email: 'marc@mail.com',
        institution: 'Rome',
        countryCitizenship: 'Laos',
        countryWork: 'Kenya' } ],
    proposalName: 'FrontierBoarding.pdf',
    budgetName: 'FrontierBoarding.pdf',
    linkToProposal:
    'http://apply.futureearth.org/pegasus2018/Lane_Proposal-1535267085376.pdf',
    linkToBudget:
    'http://apply.futureearth.org/pegasus2018/Lane_Budget-1535267085383.pdf',
    agreed: 1535267089247,
    // _id: 5b825111d68e8213607e8027
    }

    console.log(requestObject)
    
// let oauth2Client = new OAuth2(
//     '627884285375-s4ke7iuha947pv7e4fj6e07frjaqifjq.apps.googleusercontent.com',
//     'oJrMBwLCAOk5k9iWCFA1qY9A',
//     //redirect URL
//     'https://developers.google.com/oauthplayground'
// )

// oauth2Client.setCredentials({
//     refresh_token: process.env.EMAIL_REFRESH_TOKEN
// })

// let accessToken='';
// oauth2Client.refreshAccessToken((err, tokens)=>{
//     accessToken = tokens.accessToken;
// })


// let smtpTransport = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         type: 'OAuth2',
//         user: process.env.EMAIL_USER,
//         clientId: process.env.EMAIL_CLIENT_ID,
//         clientSecret: process.env.EMAIL_CLIENT_SECRET,
//         refreshToken: process.env.EMAIL_REFRESH_TOKEN,
//         accessToken: accessToken
//     }
// });



// var message = {
//     from: process.env.EMAIL_USER,
//     to: 'millifly@gmail.com',
//     subject: 'PEGASuS Application Received',
//     text: 'this is some text',
//     html: '<p>HTML version of text</>'
// }

// smtpTransport.sendMail(message, (err, info) => {
//     if (err) {console.log(err)}
//     else {
//         console.log("SUCCESS!")
//     }
// })

module.exports = {sendEmail}