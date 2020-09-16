const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getIndex);

router.get('/add-recipe', adminController.getAddRecipe);

router.post('/add-recipe', adminController.postRecipe);

module.exports = router;