let router = require('express').Router();

let publishController = require('../../controllers/publish/publishController');


//announce routes
router.get('/announce/list/all', publishController.announce_list);
router.get('/announce/list/one/:announce_id', publishController.list_announce_by_id);
router.get('/announce/list/by/city/:code_postal', publishController.list_announce_by_city);
router.get('/announce/list/by/category/:categories_id', publishController.list_announce_by_category);
router.get('/announce/list/by/city/:code_postal/category/:categories_id', publishController.list_announce_by_city_category);

//profile routes
router.get('/profile/list/all', publishController.profile_list);
router.get('/profile/list/one/:id_Profile', publishController.list_profile_by_id);
router.get('/profile/list/by/city/:code_postal', publishController.list_profile_by_city);
router.get('/profile/list/by/category/:categories_id', publishController.list_profile_by_category);
router.get('/profile/list/by/city/:code_postal/category/:categories_id', publishController.list_profile_by_city_category);


module.exports = router;