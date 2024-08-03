const express = require("express");
const {
  userSignUp,
  userLogin,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.route("/signup").post(userSignUp);
router.route("/login").post(userLogin);
router.route("/update/:id").patch(updateUser);
router.route("/delete/:id").delete(deleteUser);

module.exports = router;
