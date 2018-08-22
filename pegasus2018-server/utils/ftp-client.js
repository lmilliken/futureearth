const Client = require('ftp')

var upload = (req) => {

    var proposalFileOrigin = req.files.uploadProposal[0].path;
    var proposalFileDest = req.files.uploadProposal[0].filename;
    var budgetFileOrigin = req.files.uploadBudget[0].path;
    var budgetFileDest = req.files.uploadBudget[0].filename;
    
    var ftpClient = new Client();
    ftpClient.connect({
        host: process.env.FTP_HOST,
        port: process.env.FTP_PORT,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD
    }, (err)=>{
        console.log('error connecting to ftp server: ', err)})

    ftpClient.on('ready', function() {
        console.log("in ready")
        ftpClient.put( proposalFileOrigin, proposalFileDest, function(err) {
            console.log("proposal file uploaded")
            if (err) throw err;
          ftpClient.put( budgetFileOrigin, budgetFileDest, function(err) {
            if (err) throw err;
            console.log("budget file uploaded")
            ftpClient.end()
            console.log("connection ended?")    
            });
        });
      });   



    ftpClient.on('end', function(){
    console.log("connection to ftpClient definitely ended")
    })
}

module.exports = {upload}