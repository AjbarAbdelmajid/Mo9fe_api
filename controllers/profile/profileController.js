const models = require('../../models'),
    fs = require('fs');

const profile = models.profile,
    cities = models.city,
    images = models.files,
    categories = models.categories;

exports.update_profile = function (req, res) {
    let token = getToken(req.headers),
        toReplace = {},
        profile_data = [
            'first_name',
            'last_name',
            'age',
            'experience_dur',
            'is_searching',
            'profile_description',
            'phone',
            'categories_id',
            'code_postal',
        ],
        err_msg = '';

    if (token){
        //verify if all data are collected
        profile_data.forEach((data)=>{

            //check if the obligated data are collected
            if(!req.body[data] && data !== 'is_searching' && data !== 'age' && data !== 'phone' && data !==  'gender' && data !==  'experience_dur'){
                err_msg +=' you forget '+ data +' !!!. ';

                //set the collected data to be created
            }else {
                toReplace[data] = req.body[data]
            }
        });

        //if there is a missing data
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
                            profile.update(
                                toReplace,
                                {where: {User_id: req.user.user_id}}
                                ).then((updated)=>{
                                if (updated){

                                    //find the updated profile
                                   profile.findOne(
                                       {where: {User_id: req.user.user_id}}
                                   ).then((findIt)=>{
                                       if (findIt){
                                           req.files.forEach((image)=>{

                                               //search if the image exist
                                               images.findOne({where:{
                                                   name: image.originalname,
                                                   id_Profile: findIt.id_Profile
                                               }}).then((exist)=>{

                                                   //if the image does not exist
                                                   if (!exist){
                                                       images.create({
                                                           name: image.originalname,
                                                           file_path: image.path,
                                                           id_Profile: findIt.id_Profile
                                                       }).then().catch((err)=>{
                                                           throw Error(err)
                                                       })
                                                   }

                                                   //if the image does exist
                                                   else {
                                                               try {
                                                                   //delete the image
                                                                   fs.unlinkSync(image.path)
                                                               } catch(err) {
                                                                   console.error(err)
                                                               }
                                                   }
                                               }).catch((err)=>{throw Error(err)});
                                           });

                                           //if all goes good
                                           res.json({success: true, msg: 'profile is updated ' ,data: findIt})

                                       }
                                       });

                               } else{
                                   res.json({success: false, msg: 'profile is not updated '})
                               }
                            }).catch((err)=>{throw Error(err)});

                        } else {
                            res.send({success: false, msg: 'category is invalid'})
                        }
                    }).catch((err)=>{throw Error(err)})

                    //if city is not found
                } else {
                    res.send({success: false, msg: 'city is invalid'})
                }
            }).catch((err)=>{throw Error(err)});
        }
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'})
    }
};

exports.deactivate_profile = function (req, res) {
    let token = getToken(req.headers);
    if(token && req.user.is_admin){
        if (req.params.user_id){

            profile.findOne({
                where:{ User_id: req.params.user_id}
            }).then((find)=>{
                if (find){
                    find.update({is_searching: false,}).then((updated)=>{
                        if (updated){

                            res.json({success: true, msg:'Profile is deactivated'})
                        } else {
                            res.json({success: false, msg:'Profile is not deactivated'})
                        }
                    }).catch((err)=>{
                        throw Error(err)
                    })
                } else {
                    console.log('didn\'t find it')
                }
            }).catch((err)=>{
                throw Error(err)
            })

        }else {res.json({success: false, msg:'user is not exist'})}

    } else {res.json({success: false, msg:'Unauthorized'})}
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
