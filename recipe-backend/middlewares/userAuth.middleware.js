const { getUser } = require("../services/userAuth.service");

const isUserLoggedIn = (req, res, next) =>{
    const token = req.cookies.uid;
    console.log(token)
    const user = getUser(token)
    if(!user) return res.status(401).json({msg: "you are not logged in"});

    console.log(user);

    req.user = user;
    next();
}

module.exports = {
    isUserLoggedIn
}
