/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({path: './.env'})

const DB = process.env.DATABASE.replace(
  '<PASSWORD>', 
  process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useFindAndModify: false })
  .then(con => {
    console.log(`MongoDB Connected...`)
  })
  .catch(err => console.log(err))

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
