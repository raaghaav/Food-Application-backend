const userModel = require("../model/userModel");

async function getMe(req, res) {
  try {
    const id = req.id; // protectRoute "req.id" aage bhejta hai => we put "req.id" in "id"
    const user = await userModel.findById(id);  // finding user from "id"
    res.status(200).json({
      data: user,
      status: "successfull"
    })
  }
  catch (err) {
    res.status(400).json({
      err
    })
  }
}

async function createUser(req, res) {
  try {
    const user = userModel.create(req.body); // => req.body main user ka data bhejenge jo bhi user create karna hoga 
    res.status(201).json({
      status: "successfull",
      data: user
    })
  } catch (err) {
    res.status(500).json({
      err
    })
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await userModel.find(); // find() gives an arr of all the users 
    res.status(200).json({
      data: users,
      status: "successfull"
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err
    })
  }
}

async function getUser(req,res){
  try{
    const {userId} = req.params;
    const user = await userModel.findById(userId);
    res.status(200).json({
      status: `result for ${userId}` , 
      user,
    });
  }catch(err){
    res.json({
      err
    })
  }
}

async function removeUser(req,res){
  try{
    const {userId}= req.params;
    const deletedUser = await userModel.findByIdAndDelete(userId);
    res.json({
      data : deletedUser ,
      status  : "successfull"
    })
  }catch(err){
    res.status(400).json({err})
  }
}

async function updateUser(req,res){
  try{
    const {userId} = req.params;
    const tobeUpdatedData = req.body;
    const oldUser = await userModel.findById(userId);
    const keys = Object.keys(tobeUpdatedData);
    for(key in keys){
      oldUser[key] = tobeUpdatedData[key];
    }
    await oldUser.save();
    res.status(200).json({
      status: "userUpdated"
    });
  }catch(err){
    res.status(200).json({err})
  }
}

module.exports.getMe = getMe;
module.exports.createUser = createUser;
module.exports.getAllUsers = getAllUsers;
module.exports.getUser=getUser;
module.exports.removeUser=removeUser;
module.exports.updateUser=updateUser;

// read concepts comments from PlanController.js file