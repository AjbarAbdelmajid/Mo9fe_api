let express = require('express'),
    router = express.Router();

let categories = require('../../controllers/categories/categoriesController'),
    cities = require('../../controllers/cities/citiesController');

// Delete cities
router.delete('/city/delete/:code_postal', cities.delete_city);

//add cities
router.post('/city/add', cities.add_city);


// Delete categories
router.delete('/category/delete/:categories_id', categories.delete_categories);

//add categories
router.post('/category/add', categories.add_category);


module.exports = router;