const multer = require('multer');
const path = require('path')

var uploadLocal = (req, res) => {

    return new Promise((resolve, reject) => {

        //Set Storage Enginee
        const storage = multer.diskStorage({
            destination: './public/uploads',
            filename: function (req, file, cb) {
                cb(null, req.body.lastName[0] + '_' + file.fieldname.substring(6) + '-' + Date.now() + path.extname(file.originalname))
            }
        })

        // fileFilter(req, file, next) {
        //     const isPdf = file.mimetype.startsWith('application/pdf');
        //     if (isPdf) {
        //         next(null, true);
        //     } else {
        //         next({message: 'Invalid file type.  Please submit a .pdf file'})
        //     }
        // },

        //Init Upload
        const upload = multer({
            storage: storage
        }).fields([{ name: "uploadProposal" }, { name: "uploadBudget" }])

        upload(req, res, (err) => {
            if (err) {
                reject('Multer error uploading to local storage: ', err)
            } else {
                resolve(req.body)
            }
        })
    })
}

module.exports = { uploadLocal }