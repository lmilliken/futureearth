const multer = require("multer");
const path = require("path");

var uploadLocal = (req, res) => {
  console.log("body", req.body);
  return new Promise((resolve, reject) => {
    //Set Storage Enginee
    const storage = multer.diskStorage({
      destination: "./public/uploads",
      filename: function(req, file, cb) {
        let lastName = "";
        req.body.lastName.isArray
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
