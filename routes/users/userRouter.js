let express = require('express'),
    router = express.Router();

let usersController = require('./../../controllers/users/userController.js');


// List All Users
router.get('/list', usersController.list_users);

// List The Logged User
router.get('/me', usersController.logged_user);

// List User using ID
router.get('/search/:user_id', usersController.list_user_by_id);

// List User announces
router.get('/announce/:user_id', usersController.get_user_announces);

//user delete his account
router.delete('/delete/me/', usersController.user_delete_his_account);

// Delete User
router.delete('/delete/:user_id', usersController.delete_user);

//update info
router.patch('/update/me', usersController.update_user);


module.exports = router;