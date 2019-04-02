const db = {
    development: {//use those DB connection parameters when we still developing
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_NAME,
        host: process.env.DEV_DB_HOST,
        dialect: 'mysql',
        logging: true,
        operatorsAliases: false
    },
    production: {//use those DB connection parameters when we going to produce the application
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOST,
        dialect: 'mysql'
    }
};

module.exports = db;

