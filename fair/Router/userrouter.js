const express = require("express")
const userRouter = express.Router();
const { getAllUsers, createUser, updateUser} = require("../controller/userController");
const { getMe } = require("../controller/userController");
const { signup, login, protectRoute, isAuthorized, forgetPassword, resetPassword,logout } = require("../controller/authController");


userRouter.post("/signup", signup)
userRouter.post("/login", login)
userRouter.get("/logout", logout);
userRouter.get("/profilePage", protectRoute, getMe); // get ki req aa rahi hai "getMe" route par & protectroute => user loggedIn ho
userRouter.patch("/forgetPassword", forgetPassword)
userRouter.patch("/resetPassword/:tokeplan", resetPassword);


userRouter.use(protectRoute, isAuthorized(["admin"])); //  isAuthorized role check karega & role user main hoga, "id" ko identify karke wo role nikal kar de dega 
userRouter.route("")
  .get(getAllUsers)
  .post(createUser)
  .patch(updateUser);
module.exports = userRouter;