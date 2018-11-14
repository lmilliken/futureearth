const fs = require('fs');
const { Member } = require('./../../../models/mtl-member');

//need this line so the Member model knows which database to insert into
const { mongoose } = require('./../../../db/mongoose');
const members = require('./testData.json');
// JSON.parse(fs.readFileSync('./testData.json', 'utf-8'));
console.log('here');

//might need to override the database name in db/mongoose so it populates in feTest
try {
  Member.insertMany(members).then((result) =>
    console.log('finished inserting')
  );
} catch {
  (e) => console.log(e);
}
