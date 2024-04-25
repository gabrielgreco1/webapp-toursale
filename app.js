const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError')
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // logs HTTP requests details to the console in a nice and readable format
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTE

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Handler geral:
app.all('*', (req, res, next) => {
  // if we pass any parameters to a next(), express will know there is a error
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404))
})

// 4) START SERVER
module.exports = app;
