let Sequelize = require('sequelize'),
    fs = require('fs'),
    path = require('path');


let env = process.env.NODE_ENV,
    config = require(path.join(__dirname, '..', 'config', 'database.js'))[env];

let connexion = new Sequelize(config.database, config.username, config.password, config);
//let connexion = new Sequelize('sys','root','',{host:'localhost',dialect:'mysql',operatorsAliases:false});

let model_files = fs.readdirSync(__dirname),
    db = {};

// faltering files
model_files.filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== 'relationShips.js');
}).forEach((file)=>{
    const model = connexion.import(path.join(__dirname,file));
    db[model.name] = model;
});

db.connexion = connexion;
db.DataType = Sequelize;

require('./relationShips')(db);

module.exports = db;

