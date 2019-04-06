import express from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';

const router = express.Router(); // eslint-disable-line

router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    asyncHandler(async (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    }));

//router.get('/profile',
//    require('connect-ensure-login').ensureLoggedIn(),
//    function (req, res) {
//        res.render('profile', { user: req.user });
//    });

export default router;