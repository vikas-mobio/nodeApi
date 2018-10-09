import express from 'express';
const router =  require('express-promise-router')();
import passport from 'passport';
import passportConf from '../passport';
import { validateBody , schemas } from '../helpers/routeHelpers';
import  UserController from '../controllers/UserController';

router.route('/')
    .get(UserController.getAllUser);

router.route('/:userId')
    .get(UserController.getAllUser);

router.route('/signup')
    .post(validateBody(schemas.authSchema), UserController.signUp);

router.route('/signin')
    .post(UserController.signIn);

router.route('/secret')
    .get(passport.authenticate('jwt', {session:false }),UserController.secret);

module.exports = router;