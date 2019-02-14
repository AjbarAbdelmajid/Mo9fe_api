let express = require('express'),
    router = express.Router();

let usersController = require('./../../controllers/users/userController.js');


// List All Users
router.get('/list', usersController.list_users);

// List The Logged User
router.get('/me', usersController.logged_user);

// List User using ID
router.get('/list/:username', usersController.list_user_by_user_name);

// Delete User
router.post('/delete/:username', usersController.delete_user);


module.exports = router;