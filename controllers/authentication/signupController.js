let bCrypt = require('bcrypt-nodejs'),
    models = require('../../models');

let User = models.user,
    Profile = models.profile;

module.exports.signup = function (req, res) {
    if (!req.body.user_name || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else{
        User.findOne({
            where: {
                user_name : req.body.user_name
            }
        }).then((ifOldUser) => {
            if(ifOldUser) {
                res.json({success: ifOldUser, msg: "user already exist"});
            } else {
                User.create({
                    user_name : req.body.user_name,
                    password : hashPassWord(req.body.password)
                }).then((user) => {
                    if (user){

                        Profile.create({
                            first_name: '',
                            last_name: '',
                            profile_description: '',
                            User_id: user.user_id

                        }).then((addProfile)=>{
                            res.json({success: true, msg: 'Successful created new user.',data: addProfile });
                        }).catch((err)=>{
                            throw Error(err)
                        })
                    } else {
                        res.json({success: true, msg: 'Oops something went wrong.'});
                    }

                }).catch((err) => {
                    console.log(err);
                    return res.json({success: false, msg: 'Oops! Something went wrong.'});
                });
            }
        });

    }
} ;

function hashPassWord(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
}
