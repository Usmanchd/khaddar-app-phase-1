const express = require('express');
const router = express.Router();
// var fs = require(‘fs’);
var multer = require('multer');

const Products = require('../modals/Products');

// @route POST api/products
// @decs add products
// @access Public
router.post('/create', async (req, res) => {
  console.log(req.body);
  const {
    name,
    descrip,
    price,
    discount,
    type,
    categories,
    code,
    img,
  } = req.body;
  try {
    const newProduct = new Products({
      name,
      descrip,
      price,
      discount,
      type,
      categories,
      code,
      img,
    });
    await newProduct.save();
    res.json('saved');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error2');
  }
});

//@route    PUt api/products/:id at this id update
//@desc     update product
//@access
router.put('/:id', async (req, res) => {
  const {
    name,
    descrip,
    price,
    img,
    discount,
    type,
    categories,
    code,
  } = req.body;
  // Build contact object
  console.log(categories);
  const productFields = {};
  if (name) productFields.name = name;
  if (descrip) productFields.descrip = descrip;
  if (price) productFields.price = price;
  if (img) productFields.img = img;
  if (discount) productFields.discount = discount;
  if (type) productFields.type = type;
  if (categories) productFields.categories = categories;
  if (code) productFields.code = code;

  try {
    let product = await Products.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    product = await Products.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );
    res.json('updated');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error2');
  }
});

//@route    Delete api/products/:id at this id update
//@desc     delete product
//@access
router.delete('/:id', async (req, res) => {
  const { name, descrip, price, discount, type, category, code } = req.body;

  try {
    let product = await Products.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    await Products.findByIdAndRemove(req.params.id);
    res.json({ msg: 'deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error2');
  }
});

// @route GET api/products
// @decs test route
// @access Public
router.get('/', async (req, res) => {
  const products = await Products.find().sort('code').populate('categories');

  res.send(products);
});

module.exports = router;
