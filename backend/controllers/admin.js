const Recipe = require('../models/Recipe');

exports.getIndex = async (req, res) => {
    const recipe = await Recipe.find((data) => data);

    try {
        console.log(recipe);
        // Data rendered as an object and passed down into index.ejs
        // res.status(200).render('index', { anime: anime });

        // Data returned as json so a fetch/axios requst can get it
        res.json(recipe);
    } catch (error) {
        console.log(error);
    }
};

exports.getRecipe = async (req, res) => {
    const recipeId = req.params.recipeId;

    const recipe = await Recipe.findById(recipeId, (recipe) => recipe);

    try {
        console.log(recipe);
        res.status(200).render('recipe', { recipe: recipe });
    } catch (error) {
        console.log(error);
    }
};

exports.getAddRecipe = (req, res) => {
    res.status(200).render('edit-recipe');
};

exports.getEditRecipe = async (req, res) => {
    const recipeId = req.params.recipeId;

    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }

    const recipe = await Recipe.findById(recipeId);

    try {
        if (!recipeId) {
            return res.redirect('/');
        }
        console.log(recipe);
        res.status(200).render('edit-recipe', { recipe: recipe, editing: editMode });
    } catch (error) {
        console.log(error);
    }
};

exports.postRecipe = (req, res) => {
    const { name, image, description } = req.body;

    const recipe = new Recipe({ name: name, image: image, description: description });
    recipe.save();
    console.log('Recipe Added to the database');
    
    res.status(201).redirect('http://localhost:3000/');
};

exports.postEditRecipe = (req, res) => {
    const recipeId = req.body.recipeId;
    const { name, image, description } = req.body;

    Recipe.findById(recipeId)
        .then((recipe) => {
            recipe.name = name;
            recipe.image = image;
            recipe.description = description;

            return recipe.save();
        })
        .then(() => {
            console.log('Item Updated');
            res.status(201).redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postDelete = async (req, res) => {
    const recipeId = req.body.recipeId;

    const recipe = await Recipe.findByIdAndRemove(recipeId, (data) => data);

    try {
        console.log(recipe);
        console.log('Item Deleted');
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
};