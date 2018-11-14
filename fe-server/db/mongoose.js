var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI).then(console.log('connected'));
//   .connect('mongodb://127.0.0.1:27017/feTest')
//   .then(console.log('connected'));
// process.env.MONGODB_URI
module.exports = { mongoose };
