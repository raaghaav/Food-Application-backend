const mongoose = require('mongoose');

const DB_LINK = process.env.DB_LINK || require('../configs/config').DB_LINK;
mongoose
  .connect(DB_LINK, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(function (db) {
    console.log('reviewsDb connected');
  })
  .catch(function (err) {
    console.log(err);
  });

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Reviw can not be empty'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    default: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now, // current time
  },
  plan: {
    type: mongoose.Schema.ObjectId, // "ObjectId" gives id for an object
    ref: 'janplanmodel', // from planModel
    required: [true, 'Review must belong to a plan'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'janUserModel', // from userModel
    required: [true, 'Review must have some user'],
  },
});

// findById,findOne,findByIDandupdate , populate sab par lag jayega
reviewSchema.pre(/^find/, function (next) {
  // "/^find/" regular expression for string matchig "^"=>starts $ => ends
  this.populate('plan').populate('user'); // this => current document
  next();
});
const reviewModel = mongoose.model('reviewSchema', reviewSchema);
module.exports = reviewModel;
