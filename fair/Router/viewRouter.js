const express = require("express");
const viewRouter = express.Router();

const {getHomePage,getLoginPage,getProfilePage} = require("../controller/viewController")
const {isUserLoggedIn, protectRoute,logout} = require("../controller/authController")

viewRouter.use(isUserLoggedIn);   // koi bhi page from below agar render ho raha hai toh isUserLoggedIn fn call ho which will tell user is loggedin or not 

viewRouter.get("/",getHomePage);
//viewRouter.get("/plans",getPlansListing);
viewRouter.get("/login",getLoginPage);
//viewRouter.get("/signup",getSignupPage);
viewRouter.get("/profile",protectRoute, getProfilePage); // protectRoute verify karega tabhi getProfilePage par bhejega
viewRouter.get("/logout",logout);

module.exports = viewRouter ;
 