let router = require('express').Router();

let announceController = require('../../controllers/announces/announceController');
let upload = require('../../config/multer').upload;

router.delete('/delete/:announce_id', announceController.delete_announce);

router.post('/create',upload.array('upload_img', 3), announceController.create_announce);

router.get('/list/my/announces', announceController.logged_user_announces);


module.exports = router;
