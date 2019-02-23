module.exports = (connexion, DataType) => {

    const city =  connexion.define('city', {

        code_postal: {
            type: DataType.INTEGER,
            primaryKey: true,
        },
        city_name: {
            type: DataType.STRING,
            allowNull:false
        }
    });

    return city;
};