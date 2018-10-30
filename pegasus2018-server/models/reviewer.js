const mongoose = require("mongoose");
const validator = require("validator");

let ReviewerSchema = new mongoose.Schema({
  HLContactKey: {
    type: String,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

const Reviewer = mongoose.model("Reviewer", ReviewerSchema);
module.exports = { Reviewer };
