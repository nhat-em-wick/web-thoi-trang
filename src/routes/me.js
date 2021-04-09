const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/meController')

router.get('/wishlist', meController.wishlist)
router.get('/compare', meController.compare)



module.exports = router ;