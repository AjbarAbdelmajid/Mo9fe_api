const Export = module.exports = {};


let User = require('../../models').user;
let profile = require('../../models').profile;


Export.list_users = function (req, res) {
    let token = getToken(req.headers);

    if (token && req.user.is_admin) {
        User.findAll().then((users) => {
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
            profile.destroy({
                where: {
                    User_id : req.params.user_id
                }
            }).then((profile_is_deleted)=>{
                if (profile_is_deleted){
                    User.destroy({
                        where: {
                            user_id : req.params.user_id
                        }
                    }).then((is_deleted)=>{
                        if (is_deleted){
                            res.json({success: true, msg: 'User successfully deleted'})
                        } else {
                            res.json({success: true, msq: 'Oops something went wrong'})
                        }
                    }).catch((err)=>{
                        throw Error(err);
                    })
                } else {
                    res.json({success: true, msq: 'Oops something went wrong'})
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
        toFind = {};

    if (token){
        if (!req.body.user_name && !req.body.password){
            res.json({success: false, msg: 'please pass in your new username or password'})
        } else {
            if (req.body.user_name && ! req.body.password){
                toFind.user_name = req.body.user_name
            }
            else if(!req.body.user_name && req.body.password){
                toFind.password = req.body.password
            } else {
                toFind.password = req.body.password;
                toFind.user_name = req.body.user_name
            }
        }
        manipulation(req, res, toFind)

    } else {
        res.status(403).send({success: false, msg: 'Unauthorized'})
    }
};

function manipulation (req, res, toFind){
    User.update(
        toFind,
        {updatedAt: Date.now()},
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