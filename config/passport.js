const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/users');

const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "sit331-53hdqelol669",
};

passport.use(new JwtStrategy(option, async (jwt_payload, done) => {
    try 
    {
        const user = await User.findById(jwt_payload.id); // Correct usage of findById with async/await
        
        if (user) 
        {
            return done(null, user);
        } 
        else 
        {
            return done(null, false); // No user found
        }
    } 
    catch (error) 
    {
        return done(error, false);
    }
}));

module.exports = passport;