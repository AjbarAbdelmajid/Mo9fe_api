const Export = module.exports = {};

let cities = require('../../models').city;



Export.list_cities = function (req,res) {
    cities.findAll().then((exist) => {

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

Export.delete_city = function (req, res) {
    let token = getToken(req.headers);

    if(token && req.user.is_admin){
        if (req.params.code_postal){

            //find the city
            cities.findOne({
                where : {code_postal: req.params.code_postal}
            }).then((theCity)=>{

                //if it's exist delete's it
                if (theCity){
                    cities.destroy({
                        where : {code_postal: req.params.code_postal}
                    }).then((deleted)=>{
                        if (deleted){
                            res.json({msg: theCity.city_name +' is deleted'})
                        } else {
                            res.json({msg: theCity.city_name + ' is not deleted'})
                        }
                    }).catch((err) => {
                        throw new Error (err);
                    });

                } else{
                    res.json({msg: 'the city is not found'})
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

Export.add_city = function (req, res) {
    let token = getToken(req.headers);

    if(token && req.user.is_admin){
        if (req.body.code_postal && req.body.city_name){
            cities.findOne({
                where: {
                    code_postal : req.body.code_postal
                }
            }).then((exist) => {
                if(exist) {
                    res.json({success: false, msg: 'city with code postal : ' + exist.code_postal + " already exist"});
                } else {
                    cities.create({
                        code_postal : req.body.code_postal,
                        city_name : req.body.city_name
                    }).then(() => {
                        res.json({success: true, msg: 'Successful created new city.'});
                    }).catch((err) => {
                        console.log(err);
                        return res.json({success: false, msg: 'Oops! Something went wrong.'});
                    });
                }
            });

        } else {
            return res.status(403).send({success: false, msg: 'please pass in code postal and city name.'});
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
