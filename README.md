# Mo9fe_api
### Cloning the project:

    $ git clone https://github.com/AjbarAbdelmajid/Mo9fe_api.git

### Install dependencies

    $ npm install

### Environment variables

* Node environment & Port
```
NODE_ENV='development'
PORT=3000
```

* Database configuration (Dev && Prod)
```
DEV_DB_USERNAME='...'
DEV_DB_PASSWORD='...'
DEV_DB_NAME='...'
DEV_DB_HOST='...'
```

* admin credentials
```
ADMIN_USERNAME='admin'
ADMIN_PASSWORD='password'
```

### Activate database logs
Go to **./config/database.js** and change the following parameter to true:
```
logging=true
```

### Run API

* Default method
```
npm start
&
node ./bin/www
```

* Using Nodemon

Install **Nodemon**
```
npm start
```

To run the API
```
nodemon
```
