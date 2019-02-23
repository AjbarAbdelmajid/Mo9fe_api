let express = require('express'),
    router = express.Router();

let categories = require('../../controllers/categories/categoriesController'),
    cities = require('../../controllers/cities/citiesController');



// List All cities
router.get('/list/cities', cities.list_cities);

// List All categories
router.get('/list/categories', categories.list_categories);


module.exports = router;