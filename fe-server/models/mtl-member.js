const mongoose = require('mongoose');

let MemberSchema = new mongoose.Schema({
  INST_SHORT: { type: String },
  INST_NAME: { type: String },
  LINK: { type: String },
  TYPE: { type: String },
  LEAD_INST: { type: String, index: true },
  ['Researchers/Professors']: { type: String },
  KEYWORDS: { type: String, index: true },
  DIRECTOR: { type: String },
  CONTACT_EMAIL: { type: String },
  Phone: { type: String },
  Ext: { type: String },
  K_CP: { type: String, index: true },
  K_DECARB: { type: String, index: true },
  K_FE: { type: String, index: true },
  K_FWE: { type: String, index: true },
  K_HEALTH: { type: String, index: true },
  K_NA: { type: String, index: true },
  K_OCEAN: { type: String, index: true },
  K_RISK: { type: String, index: true },
  K_SDG: { type: String, index: true },
  K_TRANS: { type: String, index: true },
  K_URBAN: { type: String, index: true }
});

const Member = mongoose.model('mtl-member', MemberSchema);
module.exports = { Member };
