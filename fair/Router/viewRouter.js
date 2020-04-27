const express = require("express");
const viewRouter = express.Router();

const {getPlansListing,getHomePage,getLoginPage,getSignupPage} = require("../controller/viewController")

viewRouter.get("/",getHomePage);
viewRouter.get("/plans",getPlansListing);
viewRouter.get("/login",getLoginPage);
viewRouter.get("/signup",getSignupPage);


module.exports = viewRouter ;
 