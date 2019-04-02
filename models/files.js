module.exports = (connexion,DataType)=>{
    const files = connexion.define('files',{
        file_id:{
            type: DataType.UUID,
            defaultValue: DataType.UUIDV1,
            primaryKey:true,
        },
        file_path:{
            type:DataType.STRING,
            allowNull:false,
        },
        name:{
            type:DataType.STRING,
            allowNull:false,
        },
    });
    return files;
};