module.exports = (connexion, DataType)=>{
    const user = connexion.define('user',{
        user_id:{
            type: DataType.UUID,
            defaultValue: DataType.UUIDV1,
            primaryKey: true,
        },
        user_name:{
            type: DataType.STRING,
            allowNull:false,
            notEmpty: true,
        },
        password:{
            type: DataType.STRING,
            allowNull:false,
            notEmpty: true,
        },
        is_admin:{
            type: DataType.BOOLEAN,
            defaultValue: false
        },
        last_login:{
            type: DataType.DATE,
        }

    });

    return user
};