const express = require('express');
const router = express.Router();

const Orders = require('../modals/Orders');

router.post('/', async (req, res) => {
  const {
    firstname,
    secondname,
    phonenumber,
    email,
    phoneother,
    city,
    permanentAddress,
    postalAddress,
    postcodeZip,
    othernotes,
    orders,
    total,
  } = req.body;

  try {
    const newOrder = new Orders({
      firstname,
      secondname,
      phonenumber,
      email,
      phoneother,
      city,
      permanentAddress,
      postalAddress,
      postcodeZip,
      othernotes,
      orders,
      total,
    });
    await newOrder.save();
    res.json('order placed');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

router.get('/', async (req, res) => {
  const orders = await Orders.find()
    .sort('field -date')
    .populate('orders.product');
  // .populate('orders.product');
  //   .populate({
  //     path: "orders",
  //     populate: {
  //       path: "categories",
  //     },
  //   });
  res.json(orders);
});

router.put('/:id', async (req, res) => {
  const _id = req.params.id;

  const orderStatus = req.body.orderStatus;

  await Orders.findByIdAndUpdate(
    _id,
    {
      $set: { orderStatus },
    },
    {
      useFindAndModify: false,
    }
  );

  res.json('updated');
});

router.delete('/:id', async (req, res) => {
  const _id = req.params.id;
  await Orders.findByIdAndDelete(_id);

  res.json('deleted');
});

module.exports = router;
