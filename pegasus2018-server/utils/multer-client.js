const multer = require("multer");
const path = require("path");

var uploadLocal = (req, res) => {
  return new Promise((resolve, reject) => {
    //Set Storage Enginee
    const storage = multer.diskStorage({
      destination: "./public/uploads",
      filename: function(req, file, cb) {
        //figure out if there's more than one investigator, if there is take the 1st of the array as the last name
        let lastName = "";
        Array.isArray(req.body.lastName)
          ? (lastName = req.body.lastName[0])
          : (lastName = req.body.lastName);

        cb(
          null,
          lastName +
            "_" +
            file.fieldname.substring(6) +
            "-" +
            Date.now() +
            path.extname(file.originalname)
        );
      }
    });
    //Init Upload
    const upload = multer({
      storage: storage
    }).fields([{ name: "uploadProposal" }, { name: "uploadBudget" }]);

    upload(req, res, err => {
      if (err) {
        reject("Multer error uploading to local storage: ", err);
      } else {
        console.log("files in Multer", req.files);
        if (
          req.files.uploadProposal[0].mimetype != "application/pdf" ||
          req.files.uploadBudget[0].mimetype != "application/pdf"
        ) {
          resolve("Invalid File");
        }
        resolve();
      }
    });
  });
};

module.exports = { uploadLocal };
