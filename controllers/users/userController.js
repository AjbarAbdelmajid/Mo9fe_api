const Export = module.exports = {};
//list one user data

let User = require('../../models').user;
let profile = require('../../models').profile;

Export.list_users = function (req, res) {
    let token = getToken(req.headers);

    if (token && req.user.is_admin) {
        User.findAll(
            {include: [{
                model: profile,
                where: {
                    User_id : User.user_id
                }
            }]}
        ).then((users) => {
            if (users) {
            return res.json(users);
            } else {
                return res.json({success: false, msg: 'Oops! Something went wrong.'});
            }
        }).catch((err) => {
            throw new Error(err);
        });

    } else {
        return res.status(403).send({success: false, msg: 'mjid Unauthorized.'});
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

Export.list_user_by_user_name = function (req, res) {
    let token = getToken(req.headers);

    if (token  && req.user.is_admin ){
        if (req.params.username){
            User.findOne({
                where : {
                    user_name : req.params.username
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
        if(req.params.username){
            User.destroy({
                where: {
                    user_name : req.params.username
                }
            }).then((is_deleted)=>{
                if (is_deleted){
                    res.json({success: true, msg: 'User successfully deleted '})
                } else {
                    res.json({success: true, msq: 'user is not found '})
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