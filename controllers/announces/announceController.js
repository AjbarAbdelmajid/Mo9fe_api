const Export = module.exports = {};
let models = require('../../models');
let announces = models.announce,
    cities = models.city,
    images = models.files,
    categories = models.categories;
let deleteImages = require('../files/filesController').deleteImages;


Export.logged_user_announces = function (req, res) {
    let token = getToken(req.headers);

    if(token){
        announces.findAll({
            where: {
                user_id: req.user.user_id
            }
        }).then((announce) => {

            if (announce){
                return res.json(announce);
            }
            else {
                return res.json({success: false, msg: 'Oops! Something went wrong.'});
            }
        }).catch((err) => {
            throw new Error(err);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'})
    }


};

Export.delete_announce = function (req, res) {
    let token = getToken(req.headers);

    if(token){
        if (req.params.announce_id){
            announces.destroy({
                where : {
                    announce_id: req.params.announce_id
                },
                hooks: {
                    beforeDestroy:  deleteImages({'announce_id': req.params.announce_id})
                }
            }).then((deletedAnnounce)=>{
                if (deletedAnnounce){
                    res.json({msg: 'announce deleted'} )
                } else{
                    res.json({msg: 'The announce is not found'})
                }
            }).catch((err) => {
                throw new Error (err);
            });

        } else {
            return res.status(403).send({success: false, msg: 'Oops Something went wrong.'});
        }
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'})
    }
};

Export.create_announce = function (req, res) {
    let token = getToken(req.headers),
        toCreate = {},
        announce_data = [
            'announce_title',
            'announce_description',
            'categories_id',
            'code_postal',
            'is_searching',
            'rejoin_file',
            'phone',
            'price',
        ],
        err_msg = '';

    if (token){

        //verify if all data are collected
        announce_data.forEach((data)=>{

            //check if the obligated data are collected
            if(!req.body[data] && data !== 'is_searching' && data !== 'rejoin_file' && data !== 'phone' && data !==  'price'){
                err_msg += data + ' is missing !!!. ';

                //set the collected data to be created
            }else {
                toCreate[data] = req.body[data]
            }
        });

        //verify if there is a missing data
        if (err_msg !== ''){
            res.send(err_msg)

        // if all data are collected
        } else {
            //check if the city exist
            cities.findById(req.body.code_postal).then((city_exist)=>{
                if (city_exist){

                    //check if the category exist
                    categories.findById(req.body.categories_id).then((category_exist)=>{
                        if (category_exist){
                            toCreate['user_id'] =req.user.user_id;

                            //create the announce
                            announces.create(toCreate).then((created)=>{
                                if (created){

                                    //store the image path in to image table
                                    req.files.forEach((image)=>{
                                        images.create({
                                            file_path: image.path,
                                            name: image.originalname,
                                            announce_id: created.announce_id
                                        }).then().catch((err)=>{
                                            throw Error(err)
                                        })
                                    });
                                    res.json({success: true, data: created})
                                } else{
                                    res.json({success: false, msg:'is not created'})
                                }
                            }).catch((err)=>{
                                throw Error(err)
                            })

                            //if category is not found
                        } else {
                            res.send({msg: 'category is invalid'})
                        }
                    }).catch((err)=>{throw Error(err)})

                    //if city is not found
                } else {
                    res.send({msg: 'city is invalid'})
                }
            }).catch((err)=>{throw Error(err)});
        }
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'})
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