module.exports = (connexion, DataType)=>{
    const profile =  connexion.define('profile', {

        id_Profile: {
            type: DataType.UUID,
            defaultValue: DataType.UUIDV1,
            primaryKey: true,
        },
        first_name:{type: DataType.STRING,
            allowNull:false,
            notEmpty: true,
        },
        profile_title:{
            type: DataType.STRING,
            allowNull:false,
            notEmpty: true,
        },
        last_name:{
            type: DataType.STRING,
            allowNull:false,
            notEmpty: true,
        },
        age:{
            type: DataType.INTEGER,
        },
        experience_dur:{
            type: DataType.INTEGER,
        },
        phone:{
            type:DataType.STRING,
        },
        profile_description:{
            type: DataType.TEXT,
            allowNull:false,
            notEmpty: true,
        },
        gender:{
            type:DataType.ENUM('Male', 'Female'),
        },
        is_searching:{
            type:DataType.BOOLEAN,
            defaultValue:false
        },
    });
    return profile;
};
