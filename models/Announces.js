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
        is_searching:{
            type:DataType.BOOLEAN,
            defaultValue:true,
        },
        price:{
            type: DataType.INTEGER,
        },
        announce_description:{
            type: DataType.TEXT,
            allowNull:false,
            notEmpty: true,
        },
        phone:{
            type:DataType.STRING,
        },
    });
    return announce;
};