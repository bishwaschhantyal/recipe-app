const jwt = require("jsonwebtoken");
const secretKey = "recipeUser1234@#$";

const setUser = (user) => {
  try {
    return jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      secretKey
    );
  } catch (error) {
    console.log("Error signing token :", error);
  }
};

const getUser = (token) => {
  try {
    if (!token) return null;
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.log("Error verifying token :", error);
    return null;
  }
};

module.exports = {
  setUser,
  getUser,
};
