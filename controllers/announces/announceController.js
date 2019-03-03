const Export = module.exports = {};
let models = require('../../models');

let announces = models.announce,
    cities = models.city,
    File = models.files,
    categories = models.categories;


Export.logged_user_announces = function (req, res) {
    let token = getToken(req.headers);

    if(token){
        announces.findAll({
            where: {
                user_id: req.user.user_id
            }
        }).then((announce) => {

            if (announce){
                return res.json(announce);
            }
            else {
                return res.json({success: false, msg: 'Oops! Something went wrong.'});
            }
        }).catch((err) => {
            throw new Error(err);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'})
    }


};

Export.delete_announce = function (req, res) {
    let token = getToken(req.headers);

    if(token){
        if (req.params.announce_id){
            announces.destroy({
                where : {
                    announce_id: req.params.announce_id
                }
            }).then((deletedAnnounce)=>{
                if (deletedAnnounce){
                    res.json({msg: 'announce deleted'} )
                } else{
                    res.json({msg: 'The announce is not found'})
                }
            }).catch((err) => {
                throw new Error (err);
            });

        } else {
            return res.status(403).send({success: false, msg: 'Oops Something went wrong.'});
        }
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'})
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