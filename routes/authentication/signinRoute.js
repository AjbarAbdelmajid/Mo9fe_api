let express = require('express'),
    router = express.Router();

let signinController = require('../../controllers/authentication/signinController');

//normal signin
router.patch('/signin', signinController.signin);

module.exports = router;


//signin with securityMessage