const express = require('express');
const userRouter = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const {
  getAllUsers,
  createUser,
  updateUser,
  updateProfileHandler,
} = require('../controller/userController');
const { getMe } = require('../controller/userController');
const {
  signup,
  login,
  protectRoute,
  isAuthorized,
  forgetPassword,
  resetPassword,
  logout,
} = require('../controller/authController');

const multerstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/imgs/users');
  },
  filename: function (req, file, cb) {
    cb(null, `user-${Date.now()}.jpeg`);
  },
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload one'), false);
  }
};

const upload = multer({
  storage: multerstorage,
  fileFilter: fileFilter,
});

userRouter.patch(
  '/updateProfile',
  upload.single('user'),
  protectRoute,
  updateProfileHandler
);
//"upload.single("user")" => server par image add kar di & protectRoute => id nikaldi & updateProfileHandler => req.file ke anadr data chala gaya
userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
userRouter.get('/profilePage', protectRoute, getMe); // get ki req aa rahi hai "getMe" route par & protectroute => user loggedIn ho
userRouter.patch('/forgetPassword', forgetPassword);
userRouter.patch('/resetPassword/:token', resetPassword);

userRouter.use(protectRoute, isAuthorized(["admin"])); //  isAuthorized role check karega & role user main hoga, "id" ko identify karke wo role nikal kar de dega
userRouter.route('').get(getAllUsers).post(createUser).patch(updateUser);

module.exports = userRouter;
