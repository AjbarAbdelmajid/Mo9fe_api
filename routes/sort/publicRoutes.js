let express = require('express'),
    router = express.Router();

let cities = require('../../controllers/cities/citiesController');



// List All cities
router.get('/list/cities', cities.list_cities);


module.exports = router;