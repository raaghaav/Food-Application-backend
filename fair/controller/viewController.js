let planModel = require("../model/planModel");
function getTestPage(req,res){
    res.render("test.pug",{   // instead of res.json
        titile: "Test Page"
    })
}

function getPlansListing(req,res){
    const plans = await planModel.find(); // find() se saare plans aa jayenge
    res.render("plansListing.pug",{
        titile : "plans page", plans
    })
}

module.exports.getTestPage = getTestPage ;
module.exports.getPlansListing = getPlansListing ;
