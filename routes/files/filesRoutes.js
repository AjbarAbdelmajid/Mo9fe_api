let router = require('express').Router();
let filesController = require('../../controllers/files/filesController');


router.delete('/delete/image/:id_file', filesController.delete_image);


module.exports = router;