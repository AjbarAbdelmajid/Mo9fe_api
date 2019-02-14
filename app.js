let createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    env = require('dotenv').load(),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    multer  = require('multer');// For uploading files

let models = require('./models');

// Load passport strategy
require('./config/passport')(passport, models.user);


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

// For bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize Passport
app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');


// The main page
app.get('/', function(req, res) {
    res.send('Page under construction.');
});

let signup = require('./routes/authentication/signupRoute'),
    signin = require('./routes/authentication/signinRoute'),
    user = require('./routes/users/userRouter');

// Routes
app.use('/api', signup);
app.use('/api', signin);
app.use('/api/users', passport.authenticate('jwt', {session: false}), user);



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
