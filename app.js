let createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    env = require('dotenv').load(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport');

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
//app.set('view engine', 'pug'); Test

// For bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable all cors Requests <<just while working on React, i will change it later>>
app.use(cors());

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

// requiring needed routes
let signup = require('./routes/authentication/signupRoute'),
    signin = require('./routes/authentication/signinRoute'),
    user = require('./routes/users/userRouter'),
    publicSort = require('./routes/sort/publicRoutes'),
    privetSort = require('./routes/sort/privetRoutes'),
    images = require('./routes/files/filesRoutes'),
    announces  = require('./routes/announces/announcesRoutes'),
    profile  = require('./routes/profile/profileRoutes'),
    publish  = require('./routes/publish/publishRoutes');

// using Routes
app.use('/api', signup);
app.use('/api', signin);
app.use('/api/users', passport.authenticate('jwt', {session: false}), user);
app.use('/api/announce', passport.authenticate('jwt', {session: false}), announces);
app.use('/api/profile', passport.authenticate('jwt', {session: false}), profile);
app.use('/api/sort/privet', passport.authenticate('jwt', {session: false}), privetSort);
app.use('/api/images', passport.authenticate('jwt', {session: false}), images);
app.use('/api/publish', publish);
app.use('/api/sort/public', publicSort);

//download files
app.use('/upload', express.static('upload'));

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
