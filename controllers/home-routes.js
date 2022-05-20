const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// Get route for a single category page
router.get('/:id', (req, res) => {
  Post.findAll({
    where: {
      category_id: req.params.id,
    },
    attributes: [
      'id',
      'title',
      'category_id',
      'content',
      'user_id',
      'created_at',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM Likes WHERE post.id = likes.post_id)'
        ),
        'like_count',
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'content', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));
      console.log(posts);

      res.render('categorypage', {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get route for a single post in the category
router.get('/:category/post/:id', (req, res) => {
  Post.findOne({
    where: {
      category_id: req.params.category,
      id: req.params.id,
    },
    attributes: [
      'id',
      'title',
      'category_id',
      'content',
      'created_at',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM Likes WHERE post.id = likes.post_id)'
        ),
        'like_count',
      ],
    ],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        attributes: ['id', 'content', 'user_id', 'post_id', 'created_at'],
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Post,
            attributes: ['user_id'],
            include: {
              model: User,
              attributes: ['username'],
            },
          },
        ],
      },
    ],
  })
    .then((postData) => {
      if (!postData) {
        document.location.replace('/');
      }
      const post = postData.get({ plain: true });
      console.log(post);

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get route for homepage
router.get('/', (req, res) => {
  // need to add session login information as well
  res.render('homepage', { loggedIn: req.session.loggedIn });
});

module.exports = router;
