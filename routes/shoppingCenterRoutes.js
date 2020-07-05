const express = require('express');
const shoppingCenterrouter = express.Router();
const { body, validationResult } = require('express-validator');
var ShoppingCenterService = require('../shopping-center/service/shoppingCenterService');

shoppingCenterrouter.get('/:id', (req, res) => {
  ShoppingCenterService.getShoppingCenter(req, res);
});

shoppingCenterrouter.post(
  '/',
  [
    body('name').not().isEmpty().withMessage('name is mandatory'),
    body('address').not().isEmpty().withMessage('address is mandatory'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    ShoppingCenterService.create(req.body.name, req.body.address, res);
  },
);

shoppingCenterrouter.get('/', (req, res) => {
  ShoppingCenterService.getAllShoppingCenter(req, res);
});

shoppingCenterrouter.put('/:id', (req, res) => {
  ShoppingCenterService.updateShoppingCenter(req, res);
});

shoppingCenterrouter.delete('/:id', (req, res) => {
  ShoppingCenterService.deleteShoppingCenter(req, res);
});

shoppingCenterrouter.delete('/', (req, res) => {
  ShoppingCenterService.deleteAllShoppingCenter(req, res);
});

module.exports = shoppingCenterrouter;
