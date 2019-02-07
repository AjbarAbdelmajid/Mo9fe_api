let bCrypt = require('bcrypt-nodejs'),
    models = require('../../models');

User = models.user;

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
                }).then(() => {
                    res.json({success: true, msg: 'Successful created new user.'});
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
