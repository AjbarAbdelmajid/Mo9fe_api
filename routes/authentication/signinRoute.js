let express = require('express'),
    router = express.Router();

let signinController = require('../../controllers/authentication/signinController');

//normal signin
router.get('/signin', signinController.signin);

module.exports = router;


//signin with securityMessage