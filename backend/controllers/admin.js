const Recipe = require('../models/Recipe');

exports.getIndex = (req, res) => {
    res.status(200).render('index');
};

exports.getAddRecipe = (req, res) => {
    res.status(200).render('edit-recipe');
};

exports.postRecipe = (req, res) => {
    const { name, image, description } = req.body;

    const recipe = new Recipe({ name: name, image: image, description: description });
    recipe.save();
    console.log('Recipe Added to the database');
    res.status(201).redirect('/');
};