const mongoose = require('mongoose');

let MemberSchema = new mongoose.Schema({
  INST_SHORT: { type: String },
  INST_NAME: { type: String },
  LINK: { type: String },
  TYPE: { type: String },
  LEAD_INST: { type: String },
  ['Researchers/Professors']: { type: String },
  KEYWORDS: { type: String },
  DIRECTOR: { type: String },
  CONTACT_EMAIL: { type: String },
  Phone: { type: String },
  Ext: { type: String },
  K_CP: { type: String },
  K_DECARB: { type: String },
  K_FE: { type: String },
  K_FWE: { type: String },
  K_HEALTH: { type: String },
  K_NA: { type: String },
  K_OCEAN: { type: String },
  K_RISK: { type: String },
  K_SDG: { type: String },
  K_TRANS: { type: String },
  K_URBAN: { type: String }
});

const Member = mongoose.model('mtl-member', MemberSchema);
module.exports = { Member };
