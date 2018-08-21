const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d389caf107ea4b5ea660d1f636ebb772"));

const mongoose = require("mongoose");
const db = require("../models");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/tappy";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

module.exports = { 
    sendTx: function(value) {
        web3.eth.sendSignedTransaction('0x' + value, function(err, result) {
            if (err) {
                console.log('error', err);
            }
            console.log('sent', result);
            let tx = {
                tx_hash: result,
                link: "https://ropsten.etherscan.io/tx/" + result
            }
            db.Order
              .create(tx)
              .catch(err => console(err));
        });
    }
}

