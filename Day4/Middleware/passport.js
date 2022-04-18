const jwtstrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const User = require('../Models/UserModel')

module.exports = function (passport) {

    passport.use(
        new jwtstrategy({
            secretOrKey: process.env.JWT_KEY,
            jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken()
        },
            function (jwt_payload, done) {
                // console.log(jwt_payload);
                User.findOne({}, function (err, user) {
                    if (err) {
                        return done(err, false)
                    }
                    if (user) {
                        done(null, user)
                    } else {
                        done(null, false)
                    }
                })
            })
    )
}