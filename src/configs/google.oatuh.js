const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")

const User = require("../models/user.model")

const { v4: uuidv4 } = require('uuid');

require("dotenv").config();


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {

    const email = profile._json.email
    const user = await User.create({
        email,
        password:uuidv4()
    })
    
        return cb(null,user)
  }
));

module.exports = passport