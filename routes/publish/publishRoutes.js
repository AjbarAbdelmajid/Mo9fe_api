let router = require('express').Router();

let announceController = require('../../controllers/publish/publishController');


router.get('/announce/list/all', announceController.announce_list);

router.get('/announce/list/one/:announce_id', announceController.list_announce_by_id);




module.exports = router;