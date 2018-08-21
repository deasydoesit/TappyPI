var db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Order
          .find({})
          .then(dbOrder => res.json(dbOrder))
          .catch(err => res.status(422).json(err));
    },
    create: function(req) {
        db.Order
          .create(req)
          .catch(err => console(err));
    }
};