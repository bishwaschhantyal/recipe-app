const User = require("../models/user.model");
const { setUser } = require("../services/userAuth.service");

const userSignUp = async (req, res) => {
  try {
    const { username, email, password, bio } = req.body;
    if (!email) {
      return res.status(400).json({ msg: "Bad request" });
    }
    const newUser = await User.create({
      username,
      email,
      password,
      bio,
    });
    return res
      .status(201)
      .json({ msg: "successfully created new user", new_user: newUser });
  } catch (error) {
    console.error("Error while signing up", error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ msg: "User Not found" });
    }

    const token = setUser(user)
    res.cookie("uid", token)
    return res.status(200).json({ msg: "successfully login", user: email });
  } catch (error) {
    console.error("Error while login to page :", error);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    const userUpdates = await User.findByIdAndUpdate(userId, { $set: updates });
    return res.status(200).json({msg: "updated successfully", Updated: userUpdates})
  } catch (error) {
    console.error("Error while updating user :", error);
  }
};

const deleteUser = async (req, res) =>{
  try {
    const userId = req.params.id;
    const userDelete = await User.findByIdAndDelete(userId);
    return res.status(200).json({msg: "deleted successfully", deleted: userDelete})
  } catch (error) {
    console.error("Error while deleting user :", error);
  }
}
module.exports = {
  userSignUp,
  userLogin,
  updateUser,
  deleteUser
};
