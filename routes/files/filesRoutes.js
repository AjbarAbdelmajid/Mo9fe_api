let router = require('express').Router();
let filesController = require('../../controllers/files/filesController');


router.delete('/delete/:id_file', filesController.delete_image_by_id);


module.exports = router;