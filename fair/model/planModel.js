const mongoose = require('mongoose');

const DB_LINK = process.env.DB_LINK || require('../configs/config').DB_LINK;
mongoose
  .connect(DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(function (conn) {
    console.log('Plan Db connected');
  })
  .catch(function (err) {
    console.log(err);
  });

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
    trim: true,
    minlength: [5, 'A plan name must have atleast 5 Charaters'],
  },
  description: {
    type: String,
    required: [true, 'description is required'],
  },
  ratingsAverage: {
    type: Number,
    default: 7, // if no input
    min: [1, "Plan rating can't be less than 1"],
    max: [10, "Plan rating can't be  more tha 10"],
  },
  slug: String,
  price: {
    type: Number,
    required: true,
    min: 20,
  },
  discount: {
    type: Number,
    // custom validator
    validate: {
      validator: function () {
        return this.price > this.discount;
      },
      message: 'discount must be less than price',
    },
  },
});
const planModel = mongoose.model('janplanmodel', planSchema);
module.exports = planModel;
