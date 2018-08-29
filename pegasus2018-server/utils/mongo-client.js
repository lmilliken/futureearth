var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

let parentFtpDirectory = 'http://apply.futureearth.org/pegasus2018/'
let dbCollection = 'pegasus2018'

var saveToDB = (req) =>{
    let objectToSave = {
        title: req.body.title,
        investigators: [],
        proposalName: req.files.uploadProposal[0].originalname,
        budgetName: req.files.uploadBudget[0].originalname,
        linkToProposal: parentFtpDirectory + req.files.uploadProposal[0].filename ,
        linkToBudget: parentFtpDirectory + req.files.uploadBudget[0].filename,
        agreed: Date.now(),
    }

    //maybe clean up
    for (i = 0; i < req.body.firstName.length; i++) { 
        objectToSave.investigators.push({
            firstName: req.body.firstName[i],
            lastName: req.body.lastName[i],
            email: req.body.email[i],
            institution: req.body.institution[i],
            countryCitizenship: req.body.countryCitizenship[i],
            countryWork: req.body.countryWork[i]
        })
    }

    return new Promise ((resolve,reject)=>{
        MongoClient.connect(process.env.DB, function (err, client){
            if(err) {reject('Could not connect to MongoDB: ', err) }  
            var db = client.db('fcc-lxm')

            
            db.collection(dbCollection).insert(objectToSave).then(function(returned){
                    // console.log(returned);  
                    resolve({returned})
                    //send them an email confirmation
                    })


        })//MongoClient


    })
}

module.exports = {saveToDB}