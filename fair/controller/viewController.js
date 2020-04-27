let planModel = require("../model/planModel");
function getTestPage(req,res){
    res.render("test.pug",{   // instead of res.json
        titile: "Test Page"
    })
}

async function getHomePage(req,res){
    let AllPlans = await planModel.find();
    //slice AllPlans
    res.render("home.pug",{
        titile: "Home Page",AllPlans
    })
}

async function getPlansListing(req,res){
    const plans = await planModel.find(); // find() se saare plans aa jayenge & passing these plans as objects, plans:plans
    res.render("plansListing.pug",{   // rendered planListing file and passed "plans"
        titile : "plans page", plans:plans
    })
}

async function getLoginPage(req,res){
    res.render("login.pug",{
        titile: "login"
    })
}

async function getSignupPage(req,res){
    res.render("signup.pug",{
        titile: "signup"
    })
}
module.exports.getPlansListing = getPlansListing ;
module.exports.getHomePage = getHomePage ;
module.exports.getLoginPage = getLoginPage;
module.exports.getSignupPage = getSignupPage ;