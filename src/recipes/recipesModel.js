const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: Array,
  method: Array,
  public: Boolean,
  user: String,
  date: Number,
  serves: Number,
  description: String,
  category: String,
  notes: String
});

module.exports = mongoose.model("recipe", recipeSchema);
