const passport = require('passport')
const { User } = require('../models')

// JWT
// const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
require('dotenv').config()
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.JWT_SECRET

passport.use(new JwtStrategy(jwtOptions, function (jwtPayload, next) {
  User.findByPk(jwtPayload.id, {
    include: [
      { model: User, as: 'Followers' },
      { model: User, as: 'Followings' }
    ]
  }).then(user => {
    if (!user) return next(null, false)
    return next(null, user)
  })
}))

module.exports = passport
