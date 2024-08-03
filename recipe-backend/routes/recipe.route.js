const express = require("express");
const router = express.Router();
const {
  createNewRecipe,
  getAllRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipe.controller");

router.route("/").post(createNewRecipe).get(getAllRecipe);
router.route("/:id").get(getRecipe).delete(deleteRecipe).patch(updateRecipe);

module.exports = router;
