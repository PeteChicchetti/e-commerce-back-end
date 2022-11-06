const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const allTags = await Tag.findAll({
      // Included associated Products
      include: [{model: Product, through: ProductTag}]
    });
    // Respond with json from the API
    res.status(200).json(allTags);  
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      // included associated Products
      include: [{model: Product, through: ProductTag}]
    });
    // Respond with json from the api
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const addTag = await Tag.create(req.body);
    // Respond with json from the api
    res.status(200).json(addTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const editTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // If statement for a null user
    if (!editTag) {
      res.status(404).json({ message: 'No tag found with that ID!'});
      return;
    }
    // Respond with json from the api
    res.status(200).json(editTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy ({
      where: {
        id:req.params.id,
      },
    });
    // If statement for a null user
    if (!deleteTag) {
      res.status(404).json({ message: 'No tag found with that ID!'});
      return;
    }
    // Respond with json from the api
    res.status(200).json(editTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
