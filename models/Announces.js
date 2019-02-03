module.exports = (connexion,DataType)=>{
    const announce =  connexion.define('announce',{
        announce_id:{
            type: DataType.UUID,
            defaultValue: DataType.UUIDV1,
            primaryKey: true,
        },
        announce_title:{
            type: DataType.STRING,
            allowNull:false,
            notEmpty: true,
        },
        is_active:{
            type:DataType.BOOLEAN,
        },
        price:{
            type: DataType.INTEGER,
        },
        announce_description:{
            type: DataType.TEXT,
            allowNull:false,
            notEmpty: true,
        },
        rejoin_file:{
            type:DataType.STRING,
        },
        deleted_at:{
            type:DataType.DATE,
        },
    });
    return announce;
};