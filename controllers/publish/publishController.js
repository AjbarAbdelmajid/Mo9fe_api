const Export = module.exports = {};

let announces = require('../../models').announce;


Export.announce_list = function (req, res) {

    list_all(req, res, announces)
};

Export.list_announce_by_id = function (req, res) {

    if (req.params.announce_id){
        let data = {};
        data.toFind = {
            where : {
                announce_id : req.params.announce_id,
                is_searching : true
            }
        };
        data.model = announces;

        list_by_id(req, res, data)
    } else {
        return res.status(400).send({success: false , msg: 'bad announce id'})
    }
};


function list_by_id(req, res, data) {

    data.model.findOne(data.toFind).then((exist)=>{
        if (exist){
            return res.json(exist);
        } else {
            return res.status(400).send({success: false, msg:' not found' })
        }
    }).catch((err)=>{
        throw new Error(err);
    })
}

function list_all(req, res, model) {

    model.findAll({
        where: {
            is_searching : true
        }
    }).then((exist) => {

        if (exist){
            return res.json(exist);
        }
        else {
            return res.json({success: false, msg: 'Oops! Something went wrong.'});
        }
    }).catch((err) => {
        throw new Error(err);
    });

}
