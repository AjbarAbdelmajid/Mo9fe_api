let SecretKey = process.env.SECRET,
    bCrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken'),
    models = require('../../models');

let User = models.user;


module.exports.signin = function (req, res) {
    if (!req.body.user_name || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else{
        check({where : {
            user_name : req.body.user_name
        }}, req, res)
    }
};

// search for the user
function check(data, req, res){
    User.findOne(data).then((user)=>{
        if(user){
            if(checkPassword(user.password, req.body.password)){

                let payload = {user_id: user.user_id};
                //create token
                let token = jwt.sign(payload,SecretKey);
                //send token
                res.json({data:user, success: true, token: 'JWT ' + token})
            }else {
                //incorrect password
                res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
        } else {
            //incorrect account
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        }
    })

}

//verify password
function checkPassword(origin, toVerify){
    return bCrypt.compareSync(toVerify, origin)
}