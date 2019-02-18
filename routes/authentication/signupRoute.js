let express = require('express'),
    router = express.Router();

let signupController = require('../../controllers/authentication/signupController');

router.post('/signup', signupController.signup);

module.exports = router;