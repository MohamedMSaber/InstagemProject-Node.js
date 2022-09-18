const router = require('express').Router();
const { auth } = require('../../middleWare/auth');
const { myMulter, fileValidation, HME } = require('../../service/multer');
const postController = require("./controller/post");
const commentController = require("./controller/comment")
const { endPoint } = require('./post.endPoint');
const validation = require('../../middleWare/validation')
const validator  = require('../post/controller/post.validation')

router.post('/createPost',auth(endPoint.createPost),myMulter('/post',fileValidation.Image).array('image',5),HME,validation(validator.createPost),postController.createPost)
router.patch('/:id/like',auth(endPoint.createPost),validation(validator.like),postController.like)
router.patch('/:id/unLike',auth(endPoint.createPost),validation(validator.like),postController.unLike)
router.post('/:id/comment',auth(endPoint.comment),validation(validator.comment),commentController.comment)
router.get('/',postController.postList)

module.exports = router