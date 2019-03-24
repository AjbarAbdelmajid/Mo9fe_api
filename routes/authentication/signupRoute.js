let express = require('express'),
    router = express.Router();

let signupController = require('../../controllers/authentication/signupController');
let upload = require('../../config/multer').upload;


router.post('/signup',upload.single('user_image'), signupController.signup);

module.exports = router;