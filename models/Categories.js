module.exports = (connexion,DataType)=>{
    const categories = connexion.define('categories',{
        categories_id:{
            type: DataType.UUID,
            defaultValue: DataType.UUIDV1,
            primaryKey:true,
        },
        categories_name:{
            type:DataType.STRING,
            allowNull:false,
        },
    });
    return categories;
};