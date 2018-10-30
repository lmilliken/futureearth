const mongoose = require("mongoose");
const validator = require("validator");

let ReviewSchema = new mongoose.Schema({
  idReviewer: {
    type: mongoose.Schema.ObjectId,
    ref: "Reviewer",
    required: true
  },
  idProposal: {
    type: mongoose.Schema.ObjectId,
    ref: "Proposal",
    required: true
  },
  scoreTheme: Number,
  scoreImpact: Number,
  scoreMission: Number,
  scoreDiversity: Number,
  scoreCost: Number,
  recommendation: Number,
  comments: String
});

const Review = mongoose.model("Review", ReviewSchema);
module.exports = { Review };
