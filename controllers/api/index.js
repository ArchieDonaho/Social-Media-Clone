const router = require('express').Router();

// User, Post, and Comment routes go here
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js');
const categoryRoutes = require('./category-routes.js');

// router.use for User, Post, and Comment routes go here
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/category', categoryRoutes);

module.exports = router;
