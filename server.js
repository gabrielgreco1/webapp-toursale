/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './.env' });

// Listining for uncaught excetions
process.on('uncaughtException', err=> {
  console.log('UNCAUGHT EXECPTION! Shutting down...')
  console.log(err)
  process.exit(1)
})

// Creating DB connection string
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// Connecting to DB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(`MongoDB Connected...`);
  })
  .catch((err) => console.log(`Error trying to connect to MongoDB: ${err.name} \nError message: ${err.message}`));


// Running server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Listining for unhandled rejections
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...')
  console.log(err)
  process.exit(1)
})

