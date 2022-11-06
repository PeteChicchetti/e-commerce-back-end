const router = require('express').Router();
const {Category, Product} = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const allCategories = await Category.findAll({
      // Included associated Products
      include: [{model: Product}]
    });
    // Respond with json from the API
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      // included associated Products
      include: [{model: Product}]
    });
    // Respond with json from the api
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const addCategory = await Category.create(req.body);
    // Respond with json from the api
    res.status(200).json(addCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const editCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // If statement for a null user
    if (!editCategory) {
      res.status(404).json({ message: 'No category found with that ID!'});
      return;
    }
    // Respond with json from the api
    res.status(200).json(editCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy ({
      where: {
        id:req.params.id,
      },
    });
    // If statement for a null user
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with that ID!'});
      return;
    }
    // Respond with json from the api
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
