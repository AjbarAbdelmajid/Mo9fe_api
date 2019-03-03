const Export = module.exports = {};

//requiring listing models
let models = require('../../models'),
    announces = models.announce,
    profile = models.profile,
    categories = models.categories,
    city = models.city;

//for listing announces
Export.announce_list = function (req, res) {

    list_all(req, res, announces)
};
Export.list_announce_by_id = function (req, res) {

    if (req.params.announce_id){
        let data = {};
        data.toFind = {
            where : {
                announce_id : req.params.announce_id,
                is_searching : true
            }
        };
        data.model = announces;

        list_by_id(req, res, data)
    } else {
        return res.status(400).send({success: false , msg: 'bad announce id'})
    }
};
Export.list_announce_by_category = function (req, res) {
    for_categories(req, res, announces)
};
Export.list_announce_by_city = function (req, res) {
    for_city(req, res, announces)
};
Export.list_announce_by_city_category = function (req, res) {
    for_categories_cities(req, res, announces)
};

//for listing profiles
Export.profile_list = function (req, res) {

    list_all(req, res, profile)
};
Export.list_profile_by_id = function (req, res) {
    if (req.params.id_Profile){
        let data = {};
        data.toFind = {
            where : {
                id_Profile : req.params.id_Profile,
                is_searching : true
            }
        };
        data.model =profile;

        list_by_id(req, res, data)
    }else {
        return res.status(400).send({success: false , msg: 'bad profile id'})

    }

};
Export.list_profile_by_category = function (req, res) {
    for_categories(res, res, profile)
};
Export.list_profile_by_city = function (req, res) {
    for_city(req, res, profile)
};
Export.list_profile_by_city_category = function (req, res) {
    for_categories_cities(req, res, profile)
};

//functions to control the listing
function list_by_id(req, res, data) {

    data.model.findOne(data.toFind).then((exist)=>{
        if (exist){
            return res.json(exist);
        } else {
            return res.status(400).send({success: false, msg:' not found' })
        }
    }).catch((err)=>{
        throw new Error(err);
    })
}
function list_all(req, res, model) {

    model.findAll({
        where: {
            is_searching : true
        }
    }).then((exist) => {

        if (exist){
            return res.json(exist);
        }
        else {
            return res.json({success: false, msg: 'Oops! Something went wrong.'});
        }
    }).catch((err) => {
        throw new Error(err);
    });

}
function list_by_sort(req, res, data) {

    data.search_by.findById(data.id).then((exist)=>{
        if(exist){
            data.model.findAll(data.toFind).then((exist) => {

                if (exist){
                    return res.json(exist);
                }
                else {
                    return res.json({success: false, msg: 'Oops! Something went wrong.'});
                }
            }).catch((err) => {
                throw new Error(err);
            });
        } else {
            req.status(404).send({msg: data.search_by + ' is not found'})
        }
    }).catch((err) => {
        throw new Error(err);
    });


}
function for_categories(req, res, model) {

    if (req.params.categories_id){
        let data = {};
        data.toFind = {
            where : {
                categories_id : req.params.categories_id,
                is_searching : true
            }
        };
        data.model = model;
        data.search_by = categories;
        data.id = req.params.categories_id;
        list_by_sort(req, res, data)
    } else {
        return res.status(400).send({success: false , msg: 'bad category id'})
    }
}
function for_city(req, res, model){

    if (req.params.code_postal){
        let data = {};
        data.toFind = {
            where : {
                code_postal : req.params.code_postal,
                is_searching : true
            }
        };
        data.model = model;
        data.search_by = city;
        data.id = req.params.code_postal;
        list_by_sort(req, res, data)
    } else {
        return res.status(400).send({success: false , msg: 'bad city id'})
    }
}
function for_categories_cities(req, res, model) {

    if (req.params.code_postal && req.params.categories_id){
        city.findById(req.params.code_postal).then((exist)=>{

            //if the city exist
            if (exist){
                let data = {};
                data.toFind = {
                    where : {
                        code_postal : req.params.code_postal,
                        categories_id : req.params.categories_id,
                        is_searching : true
                    }
                };
                data.model = model;
                data.search_by = categories;
                data.id = req.params.categories_id;

                // check if category exist then list announces
                list_by_sort(req, res, data)

                // if the city doesn't exist
            } else{
                req.status(404).send({msg: 'city is not found'})
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    else if (!req.params.code_postal && req.params.categories_id){
        return res.status(400).send({success: false , msg: 'please set the city id'})
    }
    else if (req.params.code_postal && !req.params.categories_id){
        return res.status(400).send({success: false , msg: 'please set the category id'})
    }
    else {
        return res.status(400).send({success: false , msg: 'please set the city and category id'})
    }
}