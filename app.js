let createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    env = require('dotenv').load();

let models = require('./models');

// Check DB connection
models.connexion.authenticate().then(()=>{

    models.connexion.sync({force:true}).then(() => {

        // Create initial data to work with
        require('./config/mock_data')(models);

        // To shutdown the promise warning
        return null;
    }).catch((err)=>{
        throw new Error(err);// Raises an exception in the current code block and flow to next catch
    });

    return null; // To shutdown the promise warning
}).catch(err => {
    console.error(err); // Prints out the error
    process.exit(1); // Exit with a 'failure'
});
let app = express();
//app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, 'public')));

// The main page
app.get('/', function(req, res) {
    res.send('Page under construction.');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
