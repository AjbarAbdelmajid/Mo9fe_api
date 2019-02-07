let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function(passport, user) {
    let User = user;
    let opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = process.env.SECRET;

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

        User.findOne({
            where: {
                user_id: jwt_payload.user_id
            }
        }).then((user) => {

            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }).catch((err) => {
            if (err) {
                return done(err, false);
            }
        });
    }));
};