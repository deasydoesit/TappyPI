const db = require('../models');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/tappy";
mongoose.Promise = Promise;
mongoose.createConnection(MONGODB_URI);

module.exports = function (app) {

}