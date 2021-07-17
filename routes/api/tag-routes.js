const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// view tag by id
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json(dbPostData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create(
    {
      tag_name: req.body.tag_name
    }
  ).then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where:{
        id: req.params.id
      }
    }
  ).then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'Cannot update: No tag found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  ).then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'Cannot delete: No tag found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
