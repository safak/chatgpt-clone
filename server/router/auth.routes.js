import { Router } from 'express';
import passport from 'passport';

const router = Router();

// Google authentication route (start OAuth process)
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

// Google authentication callback route
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

export default router;
