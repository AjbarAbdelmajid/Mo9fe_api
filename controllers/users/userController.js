const Export = module.exports = {};


let User = require('../../models').user;
let profile = require('../../models').profile;
let images = require('../../models').files;
let announces = require('../../models').announce;
let deleteImages = require('../files/filesController').deleteImages;

Export.list_users = function (req, res) {
    let token = getToken(req.headers);

    if (token && req.user.is_admin) {
        User.findAll({
            include: [{all: true}]
        }).then((users) => {
            if (users) {
                return res.json(users);
            } else {
                return res.json({success: false, msg: 'Oops! Something went wrong.'});
            }
        }).catch((err) => {
            throw new Error(err);
        });

    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};

Export.logged_user = function (req, res) {
    let token = getToken(req.headers);

    if (token) {
        return res.json(req.user);
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};

Export.list_user_by_id = function (req, res) {
    let token = getToken(req.headers);

    if (token  && req.user.is_admin ){
        if (req.params.user_id){
            User.findOne({
                where : {
                    user_id : req.params.user_id
                }
            }).then((user)=>{
                if (user){
                    return res.json(user);
                } else {
                    return res.status(400).send({success: false, msg:'User not found' })
                }
            }).catch((err)=>{
                throw new Error(err);
            })
        } else {
            return res.status(400).send({success: false , msg: 'bad user id'})
        }
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'})
    }
};

Export.delete_user = function (req, res) {
    let token = getToken(req.headers);

    if(token && req.user.is_admin){
        if(req.params.user_id){

            //search for the user profile
            profile.findOne({
                where: {User_id : req.params.user_id}
            }).then((find_it)=>{
                if(find_it){

                    // delete the profile images
                    deleteImages({'id_Profile': find_it.id_Profile})
                }else{console.log('there is no profile')}
            });

            // then delete the profile
            profile.destroy({
                where: {User_id : req.params.user_id}
            }).then((profile_is_deleted)=>{
                if (profile_is_deleted){

                    // find all user announces
                    announces.findAll({
                        where: {user_id : req.params.user_id}
                    }).then((find_it)=>{
                        if(find_it) {
                            find_it.filter((element)=>{
                                return deleteImages({'announce_id': element.announce_id});
                            })
                        }else{console.log('there is no announces')}

                        //waite intel the images are deleted
                        setTimeout(()=>{
                            //delete the announces
                            announces.destroy({
                                where: {user_id : req.params.user_id}
                            }).then((destroyed) => {
                                if (destroyed){
                                    console.log('announces are destroyed')
                                }else{
                                    console.log('announce are not destroyed')
                                }
                                //delete the user
                                User.destroy({
                                    where: {
                                        user_id: req.params.user_id
                                    },
                                    hooks: {
                                        beforeDestroy: deleteImages({user_id: req.params.user_id})
                                    }
                                }).then((is_deleted) => {
                                    if (is_deleted) {
                                        res.json({success: true, msg: 'User successfully deleted'})
                                    } else {
                                        res.json({success: false, msg: 'User is not deleted'})
                                    }
                                }).catch((err) => {
                                    throw Error(err);
                                });
                            }).catch((err) => {
                                throw Error(err);
                            });
                        }, 4000);
                    }).catch((err)=>{
                        throw Error(err);
                    });
                } else {
                    res.json({success: false, msg: 'Oops something went wrong'})
                }
            }).catch((err)=>{
                throw Error(err);
            })
        } else {
            return res.json({success: false , msg : 'please pass in a user name'})
        }
    } else {
        res.status(403).send({success: false, msg: 'Unauthorized'})
    }
};

Export.update_user = function (req, res) {
    let token = getToken(req.headers),
        toUpdate = {};

    if (token){
        if (!req.body.user_name && !req.body.password){
            res.json({success: false, msg: 'please pass in your new username or password'})
        } else {
            if (req.body.user_name ){
                toUpdate.user_name = req.body.user_name
            }
            if(req.body.password){
                toUpdate.password = req.body.password
            }
            if(req.file){
                //delete the old image
                if(deleteImages({'user_id': req.user.user_id})){

                    //create the new image
                    images.create({
                        file_path: req.file.path,
                        name: req.file.originalname,
                        user_id: req.user.user_id

                        // if the image is created
                    }).then((created)=>{
                        console.log(created);

                        //if something went wrong
                    }).catch((err)=>{
                        throw Error(err)
                    })
                } else {
                    console.log('the old image is not deleted')
                }

            }
            manipulation(req, res, toUpdate)
        }

    } else {
        res.status(403).send({success: false, msg: 'Unauthorized'})
    }
};

Export.user_delete_his_account = function (req, res){
    let token = getToken(req.headers);
    if (token){
        User.destroy({
            where: {user_id: req.user.user_id},

            //delete user images
            hooks: {
                beforeDestroy: deleteImages({user_id: req.user.user_id})
            }
        }).then((deleted)=>{
            if (deleted){
                res.json({success: true, msg: 'account is deleted'})
            } else{res.json({success: false, msg: 'account is not deleted'})}
        }).catch((err)=>{
            throw Error(err)
        })
    }
};

Export.get_user_announces = function (req, res) {
    let token = getToken(req.headers);

    if (token  && req.user.is_admin ){
        if (req.params.user_id){

            announces.findAll({
                where : {user_id : req.params.user_id},
                include: [{ model: images }]
            }).then((exist)=>{
                return res.json({success: true, data: exist});
            }).catch((err)=>{
                throw new Error(err);
            })
        } else {
            return res.status(400).send({success: false , msg: 'bad user id'})
        }
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'})
    }
};

Export.get_user_profile = function (req, res) {
    let token = getToken(req.headers);

    if (token  && req.user.is_admin ){
        if (req.params.user_id){

            //search for the profile
            profile.findOne({
                where : {User_id : req.params.user_id}
            }).then((exist)=>{

                //if the profile is enabled search for profile's images
                if (exist.is_searching === true){
                    images.findAll({
                        where : {
                            id_Profile : exist.id_Profile
                        }
                    }).then((profile_images)=>{
                        return res.json({success: true, data: exist, images: profile_images});
                    }).catch((err)=>{
                        throw new Error(err);
                    });
                } else {
                    return res.json({success: false, msg:'profile is deactivated'})
                }
            }).catch((err)=>{
                throw new Error(err);
            })
        } else {
            return res.status(400).send({success: false , msg: 'bad user id'})
        }
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'})
    }
};


function manipulation (req, res, toUpdate){
    //check if the new user_name doesn't exist
    User.update(
        toUpdate,
        {
            where: {user_id: req.user.user_id}
        }
    ).then((updated)=>{
        if (updated){
            res.json({success: true, msg: 'user successfully updated'})
        } else {
            res.json({success: false, msg: 'user is not found'})
        }
    }).catch((err)=>{
        throw Error(err)
    })
}

function getToken(headers) {
    if(headers && headers.authorization){
        let token_parses = headers.authorization.split(' ');

        if(token_parses.length === 2){
            return token_parses
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}