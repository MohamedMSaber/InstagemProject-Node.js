const router = require('express').Router();
const { auth } = require('../../middleWare/auth');
const validation = require('../../middleWare/validation');
const { myMulter, fileValidation, HME } = require('../../service/multer');
const controller = require('./controller/profile');
const endPoint = require('./controller/user.endPoint');
const validator = require('./user.validation');

router.get("/profile",validation(validator.profile),auth(endPoint.displayProfile),controller.displayProfile)
router.patch("/profile/pic",auth(endPoint.displayProfile),myMulter('user/profile/profilePic' , fileValidation.Image).single('image'),HME,validation(validator.profile),controller.profilePic)
router.patch("/profile/coverPic",auth(endPoint.displayProfile),myMulter('user/profile/coverPic' , fileValidation.Image).array('image',2),HME,validation(validator.profile),controller.coverPic)
router.get("/profile/qr",auth(endPoint.displayProfile),controller.qr)








module.exports = router