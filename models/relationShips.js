module.exports = function (db) {

    //relationship between Announce And Categories it will create a table name announce_categories
    db.announce.belongsTo(db.categories, {foreignKey:'categories_id'});
    db.categories.hasMany(db.announce, {foreignKey:'categories_id'});

    //relationship between Announce And City it will create a table name announce_city
    db.announce.belongsTo(db.city, {foreignKey:'code_postal'});
    db.city.hasMany(db.announce, {foreignKey:'code_postal'});

    //relationship between User And Announce and put user_id in Announce
    db.user.hasMany(db.announce, {foreignKey:'user_id'});
    db.announce.belongsTo(db.user, {foreignKey:'user_id'});

    //relationship between User And Profile and put user_id in Profile
    db.user.hasOne(db.profile, {foreignKey:'User_id'});
    db.profile.belongsTo(db.user, {foreignKey:'User_id'});

    //relationship between Profile And Categories it will create a table name profile_categories
    db.profile.belongsTo(db.categories, {foreignKey:'categories_id'});
    db.categories.hasMany(db.profile, {foreignKey:'categories_id'});

    //relationship between Profile And City it will create a table name profile_city
    db.profile.belongsTo(db.city, {foreignKey:'code_postal'});
    db.city.hasMany(db.profile, {foreignKey:'code_postal'});

    //relationship between files And Announce and put announce_id in to files
    db.announce.hasMany(db.files, {foreignKey:'announce_id'});
    db.files.belongsTo(db.announce, {foreignKey:'announce_id'});

//relationship between files And profile and put profile_id in to files
    db.profile.hasMany(db.files, {foreignKey:'id_Profile'});
    db.files.belongsTo(db.profile, {foreignKey:'iP_profile'});
};