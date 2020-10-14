const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getIndex);

router.get('/add-recipe', adminController.getAddRecipe);

router.get('/edit-recipe/:recipeId', adminController.getEditRecipe);

router.post('/add-recipe', adminController.postRecipe);

router.post('/edit-recipe', adminController.postEditRecipe);

router.get('/:recipeId', adminController.getRecipe);

router.post('/delete', adminController.postDelete);

module.exports = router;
