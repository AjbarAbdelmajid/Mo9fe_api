let router = require('express').Router();

let announceController = require('../../controllers/announces/announceController');


router.get('/list', announceController.announce_list);

router.get('/search/:id', announceController.list_announce_by_id);


module.exports = router;


