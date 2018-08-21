const db = require('../models');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/tappy";
mongoose.Promise = Promise;
mongoose.createConnection(MONGODB_URI);

module.exports = function (app) {
    app.get("/api/sales", function(req, res) {
        db.Order.find({})
            .then(function(orders) {
              console.log("hello");
              res.send(orders);
            })
            .catch(function(err) {
              return res.json(err);
            });
    });
}