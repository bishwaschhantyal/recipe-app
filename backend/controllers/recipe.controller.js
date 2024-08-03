const Recipe = require("../models/recipe.model");

const getAllRecipe = async (req, res) => {
  try {
    const allRecipe = await Recipe.find({createdBy: req.user._id});
    if (!allRecipe) return res.status(400).json({ msg: "Bad request" });
    else return res.status(200).json({ msg: "Success", All_Recipe: allRecipe });
  } catch (error) {
    console.error("Error occurred while getting all recipe :", error);
  }
};

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findOne({_id: id, createdBy: req.user._id});
    if (!recipe) return res.status(404).json({ msg: "Not found" });
    else return res.status(200).json({ msg: "success", Recipe: recipe });
  } catch (error) {
    console.error("Error occurred while getting recipe :", error);
  }
};

const createNewRecipe = async (req, res) => {
  try {
    const { img, title, ingredients, tags, categories } = req.body;
    const newRecipe = await Recipe.create({
      img,
      title,
      ingredients,
      tags,
      categories,
      createdBy: req.user._id,
    });

    return res
      .status(201)
      .json({ msg: "Successfully created new recipe", NewRecipe: newRecipe });
  } catch (error) {
    console.error("Error occurred while creating new recipe :", error);
  }
};
const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const updateRecipe = await Recipe.findOneAndUpdate({_id: id, createdBy: req.user._id},{ $set: req.body });
  if (!updateRecipe) return res.status(404).json({ msg: "Not found" });
  else return res.status(202).json({ msg: "updated successfully" });
};
const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const deleteRecipe = await Recipe.findOneAndDelete({_id: id, createdBy: req.user._id});
  if (!deleteRecipe) return res.status(404).json({ msg: "Not found" });
  else
    return res
      .status(200)
      .json({ msg: "Deleted successfully", deleted_Recipe: deleteRecipe });
};

module.exports = {
  createNewRecipe,
  getAllRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};
