let router = require('express').Router();

let announceController = require('../../controllers/announces/announceController');


router.delete('/delete/:announce_id', announceController.delete_announce);

//router.post('/create', announceController.create_announce);

router.get('/list/my/announces', announceController.logged_user_announces);


module.exports = router;
