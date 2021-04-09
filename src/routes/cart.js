const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/cartController')

router.get('/', cartController.index)



module.exports = router ;