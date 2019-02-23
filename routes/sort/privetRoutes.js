let express = require('express'),
    router = express.Router();

let cities = require('../../controllers/cities/citiesController');

// Delete cities
router.delete('/city/delete/:code_postal', cities.delete_city);

//add cities
router.post('/city/add', cities.add_city);



module.exports = router;