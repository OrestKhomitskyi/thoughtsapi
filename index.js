const dotenv = require('dotenv');
const express = require('express');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');
const faker = require('faker');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('common'));

app.get('/', function (req, res) {
  res.send(faker.name.findName());
});

app.use(function (req, res, next) {
  if (!req.user) return next(createError(404, 'Page not found'));
  next();
});

const logSuccess = (info) => {
  console.log(chalk.green(info));
};

app.listen(process.env.PORT, () => {
  logSuccess('Server successfully started on PORT: ' + process.env.PORT);
});
