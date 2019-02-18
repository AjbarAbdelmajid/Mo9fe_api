let router = require('express').Router();

let announceController = require('../../controllers/announces/announceController');


router.post('/delete/:id', announceController.delete_announce);

//router.post('/create', announceController.create_announce);


module.exports = router;
