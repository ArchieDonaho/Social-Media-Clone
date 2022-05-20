const router = require('express').Router();
const { Category } = require('../../models');
const withAuth = require('../../utils/auth');

//get all categories
router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'name'],
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'category', 'content'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get a single category
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'name'],
    include: [
      {
        model: Post,
        attributes: [
          'id',
          'title',
          'category_id',
          'content',
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
            attributes: ['id', 'category_id', 'content', 'post_id', 'user_id'],
            include: {
              model: User,
              attributes: ['username'],
            },
          },
        ],
      },
    ],
  })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create a category
router.post('/', (req, res) => {
  Category.create({
    name: req.body.name,
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update a category
router.put('/', (req, res) => {
  Category.update(
    {
      name: req.body.name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((categoryData) => {
      if (categoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete a category
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
