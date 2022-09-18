const router = require('express').Router();
const controller = require('./controller/registration')
const authValidation = require('./auth.validation');
const validation = require('../../middleWare/validation');
const { auth } = require('../../middleWare/auth');
const { endPoint } = require('./auth.endPoint');


router.post('/signup',validation(authValidation.signUp),controller.signup)
router.get('/confirmEmail/:token',validation(authValidation.confirmEmail),controller.confirmEmail)
router.get('/reSendToken/:id', controller.resendTooken)
router.post('/login',validation(authValidation.login),controller.login)
router.post('/sendCode', controller.sendCode)
router.post('/restPass', controller.restPass)
router.post('/logout',auth(endPoint.logout) ,controller.logout)

module.exports = router