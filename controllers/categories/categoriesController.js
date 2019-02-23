const Export = module.exports = {};

let categories = require('../../models').categories;

Export.list_categories = function (req,res) {
    categories.findAll().then((exist) => {

        if (exist){
            return res.json(exist);
        }
        else {
            return res.json({success: false, msg: 'Oops! Something went wrong.'});
        }
    }).catch((err) => {
        throw new Error(err);
    })
};

Export.delete_categories = function (req, res) {
    let token = getToken(req.headers);

    if(token && req.user.is_admin){
        if (req.params.categories_id){

            //find the category
            categories.findOne({
                where : {categories_id: req.params.categories_id}
            }).then((theCategory)=>{

                //if exist delete it
                if (theCategory){
                    categories.destroy({
                        where : {categories_id: req.params.categories_id}
                    }).then((deleted)=>{
                        if (deleted){
                            res.json({msg: theCategory.categories_name +' category is deleted'})
                        } else {
                            res.json({msg: theCategory.categories_name + ' category is not deleted'})
                        }
                    }).catch((err) => {
                        throw new Error (err);
                    });

                } else{
                    res.json({msg: 'the categories is not found', cat_name: req.params.categories_id})
                }
            }).catch((err) => {
                throw new Error (err);
            });

        } else {
            return res.status(403).send({success: false, msg: 'Oops Something went wrong.'});
        }
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};

Export.add_category = function (req, res) {
    let token = getToken(req.headers);

    if(token && req.user.is_admin){
        if (req.body.categories_name){
            categories.findOne({
                where: {
                    categories_name : req.body.categories_name
                }
            }).then((exist) => {
                if(exist) {
                    res.json({success: false, msg:  exist.categories_name + " already exist"});
                } else {
                    categories.create({
                        categories_name : req.body.categories_name
                    }).then(() => {
                        res.json({success: true, msg: 'Successful created new category.'});
                    }).catch((err) => {
                        console.log(err);
                        return res.json({success: false, msg: 'Oops! Something went wrong.'});
                    });
                }
            });

        } else {
            return res.status(403).send({success: false, msg: 'please pass in category name.'});
        }
    }
};



getToken = function (headers) {
    if (headers.authorization) {
        let parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};