
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'upload'))
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
});



let upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 2},
    fileFilter: function (req, file, cb) {
        // reject files
        if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/gif" ) {
            cb(null, true)
        } else {
            cb(null, false);
        }
    }
});

exports.upload = upload;