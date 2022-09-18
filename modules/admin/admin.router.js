const router = require('express').Router();
const { auth } = require('../../middleWare/auth');
const controller = require('./controller/admin');
const { endPoint } = require('./controller/admin.endPoint');



router.get('/getUsers',auth(endPoint.getAllusers),controller.getAllUSers)
router.patch('/:id/changeRole',auth(endPoint.chanegRole),controller.chageRole)
router.patch('/:id/blookUser',auth(endPoint.chanegRole),controller.blookUser)











module.exports = router