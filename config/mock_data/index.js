let user = require('./users'),
    city = require('./cities'),
    announce = require('./announces'),
    categories = require('./categories'),
    profile = require('./profiles');


module.exports = (models)=>{

    createInitialData(user.count, user.List,models.user);
    createInitialData(city.count, city.List, models.city);
    createInitialData(announce.count, announce.List, models.announce);
    createInitialData(categories.count, categories.List, models.categories);
    createInitialData(profile.count, profile.List, models.profile);
};

function createInitialData(counter, modelData, modelName) {
    for (let i = 0; i < counter; i++){
        modelName.create(modelData(i)).then((user)=>{
            console.log('data created ');
        }).catch((err)=>{
            throw new Error(err);
        })
    }
}