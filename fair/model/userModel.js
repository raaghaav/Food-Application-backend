const mongoose = require('mongoose'); // mongoose => promise based library
const crypto = require('crypto');

const DB_LINK = process.env.DB_LINK || require('../configs/config').DB_LINK;mongoose
  .connect(DB_LINK, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(function (db) {
    console.log('userDB connected');
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 7,
    required: true,
    select: false, // all above keys are required but password nahi aayega b/c select : false
  },
  confirmPassword: {
    type: String,
    minlength: 7,
    validate: function () {
      return this.password == this.confirmPassword;
    },
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'owner'],
    default: 'user',
  },
  resetToken: String, // added these 2 keys b/c for every user this will be used
  expiresIn: String,

  profileImage: {
    type: String,
    default: '/imgs/users/default.jpeg',
  },
});

// hooks
userSchema.pre('save', function () {
  // before save it removes confirmPassword from db
  this.confirmPassword = undefined;
});

userSchema.methods.createToken = function () {
  // this method will be attached to every user
  const token = crypto.randomBytes(32).toString('hex'); // token generate kiya
  this.resetToken = token; // since this points to current document  & token ko user ke andar save kar diya
  this.expiresIn = Date.now() + 100 * 1000 * 60;
  return token; // jis email se req aayi thi uss par bhej diya
};

userSchema.methods.handleResetRequest = function (password, confirmPassword) {
  this.password = password; // updating pass of current user
  this.confirmPassword = confirmPassword; // updating ConfirmPass of current user
  this.resetToken = undefined; // now after updating we don't require resetToken
  this.expiresIn = undefined; // // now after updating we don't require expiresIn
};

const userModel = mongoose.model('NewUserModel', userSchema);

module.exports = userModel;
