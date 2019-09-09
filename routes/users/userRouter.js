let express = require('express'),
    router = express.Router();

let usersController = require('./../../controllers/users/userController.js');
let upload = require('../../config/multer').upload;

// List All Users
router.get('/list', usersController.list_users);

// List The Logged User
router.get('/me', usersController.logged_user);

// List User using ID
router.get('/search/:user_id', usersController.list_user_by_id);

// List User announces
router.get('/announce/:user_id', usersController.get_user_announces);

// List User profile
router.get('/profile/:user_id', usersController.get_user_profile);

//user delete his account
router.delete('/delete/me/:password', usersController.user_delete_his_account);

// Delete User
router.delete('/delete/:user_id', usersController.delete_user);

//update info
router.patch('/update/me',upload.single('user_image'), usersController.update_user);

router.get('/getUserProfile', usersController.get_connected_user_profile);

router.patch('/signOut', usersController.signOut);



module.exports = router;