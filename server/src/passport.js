import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/user.model.js'; 
import { v4 as uuidv4 } from 'uuid';
import config from './conf.js';

passport.use(new GoogleStrategy({
    clientID: config.googleAuth.clientId,
    clientSecret: config.googleAuth.clientSecret,
    callbackURL: config.googleAuth.callbackUrl,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            // Create a new user if not found
            user = new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                username: profile.displayName,
                fullname: profile.displayName,
                avatar: profile.photos ? profile.photos[0].value : '',
                accessToken: accessToken, // Store the access token
                refreshToken: refreshToken, // Store the refresh token
            });
            await user.save();
        } else {
            // Update existing user with new tokens
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            await user.save();
        }

        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));






// Serialize user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;
