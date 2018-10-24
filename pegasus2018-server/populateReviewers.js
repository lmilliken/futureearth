const { Reviewer } = require("./models/reviewer");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://admin:Earthy8Futurific@ds139243.mlab.com:39243/fe-pegasus",
  { useNewUrlParser: true }
);

const reviewers = [
  {
    HLContactKey: "a897f6d8-ce40-40b5-add9-5c319d6d6a54",
    firstName: "Test",
    lastName: "User"
  },
  {
    HLContactKey: "de193a77-5f67-405a-95c5-fa52c5b71ddf",
    firstName: "Craig",
    lastName: "Starger"
  },
  {
    HLContactKey: "0a2cc1a9-69d8-453a-b8b8-45a7f7475a18",
    firstName: "Jon",
    lastName: "Padgam"
  }
];

Reviewer.find().then(returned => console.log(returned));
// Reviewer.deleteMany({})
//   .then(
//     Reviewer.insertMany(reviewers)
//       .then(console.log("new reviewers inserted"))
//       .catch(err => console.log("error"))
//   )
//   .catch(err => console.log(err));
