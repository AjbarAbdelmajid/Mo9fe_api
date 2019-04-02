let bCrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken'),
    models = require('../../models');

let User = models.user,
    Profile = models.profile,
    images = models.files;

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

                        //initiate user profile
                        Profile.create({
                            first_name: '',
                            last_name: '',
                            profile_description: '',
                            User_id: user.user_id

                        }).then(()=>{

                            // create user image
                            if (req.file){
                            images.create({
                                file_path: req.file.path,
                                name: req.file.originalname,
                                user_id: user.user_id
                            }).then((created)=>{
                                console.log(created);
                            }).catch((err)=>{
                                throw Error(err)
                            })}
                        }).then(()=>{
                            //create token
                            let payload = {user_id: user.user_id},
                                token = jwt.sign(payload, process.env.SECRET);

                            //send token
                            res.json({success: true, msg: 'Successful created new user.',data: user, token: 'JWT ' + token});
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
