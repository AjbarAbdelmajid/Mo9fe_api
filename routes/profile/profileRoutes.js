let router = require('express').Router();

let profileController = require('../../controllers/profile/profileController');
let upload = require('../../config/multer').upload;

router.patch('/update',upload.array('upload_img', 3), profileController.update_profile);


module.exports = router;