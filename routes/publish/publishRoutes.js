let router = require('express').Router();

let publishController = require('../../controllers/publish/publishController');


router.get('/announce/list/all', publishController.announce_list);

router.get('/announce/list/one/:announce_id', publishController.list_announce_by_id);


router.get('/profile/list/all', publishController.profile_list);

router.get('/profile/list/one/:id_Profile', publishController.list_profile_by_id);


/*profile and announce:
    * list by cities
    * list by categories
*/


module.exports = router;