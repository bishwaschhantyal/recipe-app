const { getUser } = require("../services/userAuth.service");

const isUserLoggedIn = async(req, res, next) => {
  // const token = req.cookies.uid;
  const headerVal = req.headers["authorization"];
  if (!headerVal) {
    return res.status(400).json({
      success: false,
      message: "Token not provided",
    });
  }

  const token = headerVal.substring(7);

  const user = getUser(token);
  if (!user) return res.status(400).json({ msg: "you are not logged in" });

  req.user = user;
  next();
};

module.exports = {
  isUserLoggedIn,
};
