const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d389caf107ea4b5ea660d1f636ebb772"));

module.exports = { 
    sendTx: function(value) {
        web3.eth.sendSignedTransaction('0x' + value, function(err, result) {
            if (err) {
                console.log('error', err);
            }
            console.log('sent', result);
            return "https://ropsten.etherscan.io/tx/" + result;
        });
    }
}

