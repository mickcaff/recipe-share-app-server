const router = require("express").Router();
const recipesModel = require("./recipesModel");

router.post("/api/recipe", async (req, res) => {
  try {
    const newRecipe = new recipesModel({
      title: req.body.title,
      category: req.body.category,
      serves: req.body.serves,
      description: req.body.description,
      ingredients: req.body.ingredients,
      method: req.body.method,
      notes: req.body.notes,
      public: req.body.public,
      user: req.body.user,
      date: Date.now(),
    });
    const saveRecipe = await newRecipe.save();
    res.status(200).json(saveRecipe);
  } catch (err) {
    res.json(err);
  }
});

router.get("/api/recipes", async (req, res) => {
  try {
    const allRecipes = await recipesModel.find(req.query);
    res.status(200).json(allRecipes);
  } catch (e) {
    res.json(e);
  }
});

router.get("/api/recipe/:id", async (req, res) => {
  try {
    const recipe = await recipesModel.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (e) {
    res.json(e);
  }
});

router.put("/api/recipe/:id", async (req, res) => {
  try {
    const updateRecipe = await recipesModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updateRecipe);
  } catch (e) {
    res.json(e);
  }
});

router.delete("/api/recipe/:id", async (req, res) => {
  try {
    const deleteRecipe = await recipesModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Recipe Deleted");
  } catch {
    res.json(e);
  }
});

module.exports = router;
