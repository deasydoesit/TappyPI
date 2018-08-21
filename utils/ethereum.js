const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d389caf107ea4b5ea660d1f636ebb772"));
const crmController = require("../controllers/crmController");

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
            crmController.create(tx);
        });
    }
}

