const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const jwtstrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;

const passport = require('passport');

//Create User roles for Admin, App user
module.exports = function (passport) {
    passport.use(
        new jwtstrategy({
            secretOrKey: "sweet",
            jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken()
        },
            function (jwt_payload, next) {
                const _id = jwt_payload.id
                // console.log(jwt_payload);
                User.findById(_id).then((userData) => {
                    if (userData.role == "admin") {
                        next(null, userData);
                    } else {
                        return res.status(400).json({ message: "You are not authorized" })
                    }
                })
            })
    )
}

passport.deserializeUser((_id, done) => {
    User.findById(_id, (err, user) => {
        if (err) return done(null, false)
        return done(null, user)
    })
})