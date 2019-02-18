let express = require('express'),
    router = express.Router();

let usersController = require('./../../controllers/users/userController.js');


// List All Users
router.get('/list', usersController.list_users);

// List The Logged User
router.get('/me', usersController.logged_user);

// List User using ID
router.get('/search/:user_id', usersController.list_user_by_id);

// Delete User
router.delete('/delete/:user_id', usersController.delete_user);

module.exports = router;