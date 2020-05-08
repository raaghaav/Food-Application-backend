const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json()); // add incoming data on json to req.body
const planRouter = require('./Router/planRouter');
const userRouter = require('./Router/userrouter');
const viewRouter = require('./Router/viewRouter');
const reviewRouter = require('./Router/reviewRouter');
const bookingRouter = require('./Router/bookingRouter');

app.use(express.static('public')); // this enables to send all the static files like js, images, css etc
app.use(cookieParser()); // reads & logs the cookies

app.set('view engine', 'pug'); // templating engine
app.set('views', 'views'); // templating address

app.use('/', viewRouter);
app.use('/api/plans', planRouter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/bookings', bookingRouter);

app.use('*', function (req, res) {
  return res.status(404).json({
    status: 'Resource not found',
  });
});

app.listen(3000, function () {
  console.log('Server is listening at port 3000');
});

// cookie parser => add cookie to req.cookies
