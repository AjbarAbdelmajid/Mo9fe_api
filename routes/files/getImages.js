let router = require('express').Router();
let filesController = require('../../controllers/files/filesController');


router.get('/all', filesController.getImages);


module.exports = router;