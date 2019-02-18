const Export = module.exports = {};

let announces = require('../../models').announce;


Export.announce_list = function (req, res) {

    announces.findAll({
        where: {
            is_active : true
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

};

Export.list_announce_by_id = function (req, res) {

        if (req.params.announce_id){
            announces.findOne({
                where : {
                    announce_id : req.params.announce_id,
                    is_active : true
                }
            }).then((the_announce)=>{
                if (the_announce){
                    return res.json(the_announce);
                } else {
                    return res.status(400).send({success: false, msg:'Announce not found' })
                }
            }).catch((err)=>{
                throw new Error(err);
            })
        } else {
            return res.status(400).send({success: false , msg: 'bad announce id'})
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