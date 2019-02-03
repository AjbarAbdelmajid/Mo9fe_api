module.exports = (connexion, DataType) => {

    const city =  connexion.define('city', {

        city_id: {
            type: DataType.UUID,
            defaultValue: DataType.UUIDV1,
            primaryKey: true,
        },
        city_name: {
            type: DataType.STRING,
            allowNull:false
        }
    });

    return city;
};