const express = require("express");
const { connectMongoDB } = require("./config/server");
const {isUserLoggedIn} = require("./middlewares/userAuth.middleware")
const recipeRouter = require("./routes/recipe.route");
const userRouter = require("./routes/user.route");
const cookieParser = require("cookie-parser")
const app = express();

require("dotenv").config({path: ".env"})

const PORT = process.env.PORT || 1001;

connectMongoDB(process.env.MONGO_CONNECTION_URL)
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log("Error while connecting mongoDB :", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use("/recipe", isUserLoggedIn, recipeRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server has started at port ${PORT}`);
});
