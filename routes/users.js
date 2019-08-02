const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Item = require("../models/item");
const Sale = require("../models/sale");
const passport = require('passport');

router.post('/register', (req, res) => {
  let user = new User({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  });

  User.AddUser(user, response => {
    res.json(response)
  });

});

router.post('/authenticate', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  }
  
  User.Authenticate(user, response => {
    res.json(response)
  });
});

router.get('/test', passport.authenticate('jwt', {session:false}), (req, res) => {
  res.json({test:1});
});


router.post('/addItem', (req, res) => {
  let item = new Item({
    itemName: req.body.itemName,
    itemDesc: req.body.itemDesc,
    itemQuan: req.body.itemQuan,
    itemPrice: req.body.itemPrice,
    status: req.body.status,
    date: req.body.date,
    createdBy: req.body.createdBy
  });

  Item.addNewItem(item, response => {
    res.json(response);
  });

});

router.get('/itemList', (req, res) => {
  Item.find((err, docs) => {
      if (!err) { res.send(docs); }
      else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
  });
});


router.put('/updateItem/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params.id);

  let item = {
    itemName: req.body.itemName,
    itemDesc: req.body.itemDesc,
    itemQuan: req.body.itemQuan,
    itemPrice: req.body.itemPrice,
    status: req.body.status,
    date: req.body.date,
    createdBy: req.body.createdBy
  };

  Item.updateItem(req.params.id, item, response => {
    res.json(response);
  })

});

router.post('/addSale', (req, res) => {
  let sale = new Sale({
    customerId: req.body.customerId,
    items: [],
    date: req.body.date,
    totalPrice: req.body.totalPrice
  });

  req.body.items.forEach(e => sale.items.push(e));

  console.log(sale);

  Sale.addNewSale(sale, response => {
    res.json(response);
  });

});

router.get('/saleList', (req, res) => {
  Sale.find((err, docs) => {
      if (!err) { res.send(docs); }
      else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
  });
});

module.exports = router;