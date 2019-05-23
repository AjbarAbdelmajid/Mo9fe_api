let bCrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken'),
     fs = require('fs'),
    models = require('../../models');

let User = models.user,
    Profile = models.profile;

module.exports.signup = function (req, res) {
    if (!req.body.user_name || !req.body.password) {

        // delete the uploaded image
        if (req.file){
            try {
                fs.unlinkSync(req.file.path)
            } catch (err) {
                return console.error(err)
            }
        }
        res.json({success: false, msg: 'Please pass username and password.'});
    } else{
        User.findOne({
            where: {
                user_name : req.body.user_name
            }
        }).then((ifOldUser) => {
            if(ifOldUser) {
                if (req.file){
                    try {
                        fs.unlinkSync(req.file.path)
                    } catch (err) {
                        return console.error(err)
                    }
                }
                res.json({success: false, msg: "user already exist"});
            } else {

                //add the picture path  to the user info
                let pictureInfo = null;
                if (req.file){
                    pictureInfo = req.file.path
                }
                User.create({
                    user_name : req.body.user_name,
                    password : hashPassWord(req.body.password),
                    picture: pictureInfo,
                }).then((user) => {
                    if (user){

                        //initiate user profile
                        Profile.create({
                            first_name: '',
                            last_name: '',
                            profile_description: '',
                            User_id: user.user_id,
                            profile_title: '',

                        }).then(()=>{

                            //create token
                            let payload = {user_id: user.user_id},
                                token = jwt.sign(payload, process.env.SECRET);

                            //send token
                            res.json({success: true, msg: 'Successful created new user. ', data: user, token: 'JWT ' + token});
                        }).catch((err)=>{
                            throw Error(err)
                        })
                    } else {
                        res.json({success: false, msg: 'Oops something went wrong.'});
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
