const express = require('express');
const router = express.Router();
const cleanBody = require('../middlewares/cleanBody')
const { verifyUserToken, IsUser, IsAdmin,IsGardener } = require('../middlewares/auth');
const upload = require('../middlewares/uploadFiles')
const userController = require('../controllers/userController');
const blogController = require('../controllers/admin/blogController')

/************ admin api *************/

///////// signup and login for user //////////////
router.post('/user/signup', cleanBody, userController.signup);
router.post('/user/login', cleanBody, userController.login);

////// blog with authentication ////////
router.post('/user/blogs', verifyUserToken, IsUser, upload.single('blog_image'), blogController.create);
router.patch('/user/blogs/:id', verifyUserToken, IsUser, upload.single('blog_image'), blogController.update);
router.get('/user/blogs', verifyUserToken, IsUser, blogController.getAll);
router.get('/user/blogsPagination', verifyUserToken, IsUser, blogController.getAllPagination);
router.get('/user/blogs/:id', verifyUserToken, IsUser, blogController.getById);
router.delete('/user/blogs/:id', verifyUserToken, IsUser, blogController.deleteById);

router.get('/user/allblog', blogController.getAll);




/************ end user api *************/

module.exports = router;