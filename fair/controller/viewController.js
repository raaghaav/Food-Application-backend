// give the views by rendering the html page
const planModel = require('../model/planModel');
const userModel = require('../model/userModel');

async function getHomePage(req, res) {
  let plans = await planModel.find();
  let name = req.userName;
  res.render('home.pug', {
    plans,
    name: name,
  });
}

async function getPlansPage(req, res) {
  let plans = await planModel.find(); // planModel =>get  plans
  let name = req.userName;
  res.render('plansListing.pug', {
    title: 'Plans Page',
    plans,
    name,
  });
}

function getLoginPage(req, res) {
  let name = req.userName;
  res.render('login.pug', {
    name,
  });
}

async function getProfilePage(req, res) {
  const user = await userModel.findById(req.id); // protectRoute next wale fn  "req.id" main bhejta hai aage
  const name = req.userName;
  res.render('profile.pug', {
    user,
    name,
  });
}

async function getSignupPage(req, res) {
  let name = req.userName;
  res.render('signup.pug', {
    name,
  });
}

async function getForgetPasswordPage(req, res) {
  res.render('forgetPassword.pug', {});
}
async function getResetPage(req, res) {
  const token = req.params.token;
  console.log('555' + token);
  res.render('resetPassword.pug', { token });
}

async function getSomethingWentWrongPage(req, res) {
  res.render('somethingWentWrong.pug');
}

module.exports.getHomePage = getHomePage;
module.exports.getPlansPage = getPlansPage;
module.exports.getLoginPage = getLoginPage;
module.exports.getProfilePage = getProfilePage;
module.exports.getSignupPage = getSignupPage;
module.exports.getForgetPasswordPage = getForgetPasswordPage;
module.exports.getResetPage = getResetPage;
module.exports.getSomethingWentWrongPage = getSomethingWentWrongPage;
