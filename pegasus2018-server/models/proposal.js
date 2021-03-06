const mongoose = require("mongoose");
const validator = require("validator");

let ProposalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  investigators: [
    {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        validate: {
          validator: validator.isEmail,
          message: "{VALUE} is not a valid email."
        }
      },
      institution: {
        type: String,
        required: true
      },
      countryCitizenship: {
        type: String,
        required: true
      },
      countryWork: {
        type: String,
        required: true
      }
    }
  ],
  proposalName: {
    type: String,
    required: true
  },
  proposalLink: {
    type: String,
    required: true
  },
  budgetName: {
    type: String,
    required: true
  },
  budgetLink: {
    type: String,
    required: true
  },
  agreed: {},
  notes: {},
  tags: {},
  assignedReviewers: [{ type: mongoose.Schema.ObjectId, ref: "Reviewer" }]
});

ProposalSchema.methods.parseAndSave = function(req) {
  let parentFtpDirectory = process.env.parentFtpDirectory;

  let proposal = this;

  proposal.title = req.body.title;
  proposal.proposalName = req.files.uploadProposal[0].originalname;
  proposal.budgetName = req.files.uploadBudget[0].originalname;
  proposal.proposalLink =
    parentFtpDirectory + req.files.uploadProposal[0].filename;
  proposal.budgetLink = parentFtpDirectory + req.files.uploadBudget[0].filename;
  proposal.agreed = Date.now();

  // proposal = {
  //   title: req.body.title,
  //   investigators: [],
  //   proposalName: req.files.uploadProposal[0].originalname,
  //   budgetName: req.files.uploadBudget[0].originalname,
  //   proposalLink: parentFtpDirectory + req.files.uploadProposal[0].filename,
  //   budgetLink: parentFtpDirectory + req.files.uploadBudget[0].filename,
  //   agreed: Date.now()
  // };

  //maybe clean up
  if (Array.isArray(req.body.firstName)) {
    //map instead? not really since
    for (i = 0; i < req.body.firstName.length; i++) {
      proposal.investigators.push({
        firstName: req.body.firstName[i],
        lastName: req.body.lastName[i],
        email: req.body.email[i],
        institution: req.body.institution[i],
        countryCitizenship: req.body.countryCitizenship[i],
        countryWork: req.body.countryWork[i]
      });
    }
  } else {
    proposal.investigators.push({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      institution: req.body.institution,
      countryCitizenship: req.body.countryCitizenship,
      countryWork: req.body.countryWork
    });
  }
  console.log({ proposal });
  return proposal.save();
};

const Proposal = mongoose.model("Proposal", ProposalSchema);
module.exports = { Proposal };
