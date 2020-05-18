const userModel = require('../model/userModel');
const factory = require ("../utility/factory")
const sharp = require('sharp');
const fs = require('fs');

async function getMe(req, res) {
  try {
    const id = req.id; // protectRoute "req.id" aage bhejta hai => we put "req.id" in "id"
    const user = await userModel.findById(id); // finding user from "id"
    res.status(200).json({
      data: user,
      status: 'successfull',
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
}

async function updateProfileHandler(req, res) {
  try {
    const id = req.id;
    const user = await userModel.findById(id);

    let toBesavedImagePath = `public/imgs/users/user-${Date.now()}.jpeg`; // process image
    await sharp(req.file.path)
      .toFormat('jpeg')
      .jpeg({ quality: 60 })
      .toFile(toBesavedImagePath);

    let iDBLink = toBesavedImagePath.split('/').slice(1).join('/'); // public remove

    user.profileImage = iDBLink; // user update
    await user.save({
      validateBeforeSave: false,
    });
    //  user profile Image link update
    // process update public folder
    //db link update
    res.status(200).json({
      success: 'Image uploaded',
    });

    fs.promises.unlink(req.file.path);
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: 'something went wrong',
    });
  }
}

module.exports.getMe = getMe;
module.exports.updateProfileHandler = updateProfileHandler;module.exports.getUser = factory.getElement(userModel);

module.exports.getAllUsers = factory.getAllElement(userModel);
module.exports.updateUser = factory.updateElement(userModel);
module.exports.deleteUser = factory.deleteElement(userModel);
module.exports.createUser = factory.createElement(userModel);

// read concepts comments from PlanController.js file




// async function createUser(req, res) {
//   try {
//     const user = userModel.create(req.body); // => req.body main user ka data bhejenge jo bhi user create karna hoga
//     res.status(201).json({
//       status: 'successfull',
//       data: user,
//     });
//   } catch (err) {
//     res.status(500).json({
//       err: err.message,
//     });
//   }
// }

// async function getAllUsers(req, res) {
//   try {
//     const users = await userModel.find(); // find() gives an arr of all the users
//     res.status(200).json({
//       data: users,
//       status: 'successfull',
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       err,
//     });
//   }
// }

// async function getUser(req, res) {
//   try {
//     const { userId } = req.params;
//     const user = await userModel.findById(userId);
//     res.status(200).json({
//       status: `result for ${userId}`,
//       user,
//     });
//   } catch (err) {
//     res.json({
//       err,
//     });
//   }
// }

// async function removeUser(req, res) {
//   try {
//     const { userId } = req.params;
//     const deletedUser = await userModel.findByIdAndDelete(userId);
//     res.json({
//       data: deletedUser,
//       status: 'successfull',
//     });
//   } catch (err) {
//     res.status(400).json({ err });
//   }
// }

// async function updateUser(req, res) {
//   try {
//     const { userId } = req.params;
//     const tobeUpdatedData = req.body;
//     const oldUser = await userModel.findById(userId);
//     const keys = Object.keys(tobeUpdatedData);
//     for (key in keys) {
//       oldUser[key] = tobeUpdatedData[key];
//     }
//     await oldUser.save();
//     res.status(200).json({
//       status: 'userUpdated',
//     });
//   } catch (err) {
//     res.status(200).json({ err });
//   }
// }



// module.exports.createUser = createUser;
// module.exports.getAllUsers = getAllUsers;
// module.exports.getUser = getUser;
// module.exports.removeUser = removeUser;
// module.exports.updateUser = updateUser;
 



