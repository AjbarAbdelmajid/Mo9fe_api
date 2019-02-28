module.exports = function (db) {

    //relationship between Announce And Categories it will create a table name announce_categories
    db.announce.belongsToMany(db.categories, {through:'announce_categories', foreignKey:'Announce_id'});
    db.categories.belongsToMany(db.announce, {through:'announce_categories', foreignKey:'Categories_id'});

    //relationship between Announce And City it will create a table name announce_city
    db.announce.belongsToMany(db.city, {through:'announce_city', foreignKey:'Announce_id'});
    db.city.belongsToMany(db.announce, {through:'announce_city', foreignKey:'City_id'});

    //relationship between User And Announce and put user_id in Announce
    db.user.hasMany(db.announce, {foreignKey:'User_id'});
    db.announce.belongsTo(db.user, {foreignKey:'User_id'});

    //relationship between User And Profile and put user_id in Profile
    db.user.hasOne(db.profile, {foreignKey:'User_id'});
    db.profile.belongsTo(db.user, {foreignKey:'User_id'});

    //relationship between Profile And Categories it will create a table name profile_categories
    db.profile.belongsToMany(db.categories, {through:'profile_categories', foreignKey:'profile_id'});
    db.categories.belongsToMany(db.profile, {through:'profile_categories', foreignKey:'Categories_id'});

    //relationship between Profile And City it will create a table name profile_city
    db.profile.belongsToMany(db.city, {through:'profile_city', foreignKey:'profile_id'});
    db.city.belongsToMany(db.profile, {through:'profile_city', foreignKey:'City_id'});

};