require('dotenv').config();
const mongoose = require('mongoose');
const { Member } = require('./../models/mtl-member');

const members = require('./mtlFullData.json');

mongoose.connect(process.env.DB);

//this magically knows to insert it in the mongoose database above
Member.remove()
  .insertMany(members)
  .then((result) => console.log('finished inserting'))
  .catch((err) => console.log(err));
