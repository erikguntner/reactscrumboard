'use strict';

const mongoose = require('mongoose');
require('dotenv').config();
var Schema = mongoose.Schema

const uri = process.env.DATABASE_URL;

const SimpleUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  isLoggedIn: Boolean,
});
const SimpleUser = mongoose.model('SimpleUser', SimpleUserSchema);
const fetchMongoData = function(request, response, next) {
  mongoose
    .connect(uri)
    .then(() => console.log('conencted to mongoose'))
    .catch(e => {
      response.locals.error = {
        error: { message: 'mongoose connection error', e },
        statusCode: 503,
      };
      next();
    });
};

module.exports = { SimpleUser, fetchMongoData };
