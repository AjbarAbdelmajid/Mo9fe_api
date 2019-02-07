let express = require('express'),
    router = express.Router();

let signupController = require('../../controllers/authentication/signupController');

router.get('/signup', signupController.signup);

module.exports = router;