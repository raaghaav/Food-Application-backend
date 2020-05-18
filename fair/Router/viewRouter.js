const express = require('express');
const viewRouter = express.Router();

const {
  getHomePage,
  getLoginPage,
  getSignupPage,
  getProfilePage,
  getForgetPasswordPage,
  getResetPage,
  getSomethingWentWrongPage,
  getPlansPage
} = require('../controller/viewController');
const {
  isUserLoggedIn,
  protectRoute,
  handleResetRequest,
} = require('../controller/authController');

viewRouter.use(isUserLoggedIn); // koi bhi page from below agar render ho raha hai toh isUserLoggedIn fn call ho which will tell user is loggedin or not
//viewRouter.use(handleResetRequest);

viewRouter.get('/', getHomePage);
viewRouter.get("/plans",getPlansPage);
viewRouter.get('/login', getLoginPage);
viewRouter.get('/signup', getSignupPage);
viewRouter.get('/profile', protectRoute, getProfilePage); // protectRoute verify karega tabhi getProfilePage par bhejega
viewRouter.get('/forgetPassword', getForgetPasswordPage);
viewRouter.get('/resetPassword', getResetPage);
viewRouter.get('/somethingWentWrong', getSomethingWentWrongPage);
viewRouter.get('/resetPassword/:token', handleResetRequest, getResetPage);

module.exports = viewRouter;
