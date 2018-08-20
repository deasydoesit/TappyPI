var bleno = require('bleno');
var sendTx = require('./sendTx');
// var Web3 = require('web3');

// var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d389caf107ea4b5ea660d1f636ebb772"));

function ble() {
    bleno.on('stateChange', function(state) {
        console.log('State change: ' + state);
        if (state === 'poweredOn') {
            bleno.startAdvertising('MyDevice',['12ab']);
        } else {
            bleno.stopAdvertising();
        }
    });
    
    bleno.on('accept', function(clientAddress) {
        console.log("Accepted connection from address: " + clientAddress);
    });
    
    bleno.on('disconnect', function(clientAddress) {
        console.log("Disconnected from address: " + clientAddress);
    });
    
    bleno.on('advertisingStart', function(error) {
        if (error) {
            console.log("Advertising start error:" + error);
        } else {
            console.log("Advertising start success");
            bleno.setServices([
                
                new bleno.PrimaryService({
                    uuid : '12ab',
                    characteristics : [
                        
                        new bleno.Characteristic({
                            value : null,
                            uuid : '34cd',
                            properties : ['notify', 'read', 'write'],
                            
                            onReadRequest : function(offset, callback) {
                                console.log("Read request received");
                                callback(this.RESULT_SUCCESS, Buffer("Echo: " + (this.value ? this.value.toString("utf-8") : "")));
                            },
                            
                            onWriteRequest : function(data, offset, withoutResponse, callback) {
                                this.value = data;
                                // var serializedTx = this.value.toString("hex");
                                // console.log(data);
                                // console.log('Write request: value = ' + this.value);
                                sendTx(this.value);
                                callback(this.RESULT_SUCCESS);

                                // web3.eth.sendSignedTransaction('0x' + this.value, function(err, result) {
                                //     if (err) {
                                //         console.log('error', err);
                                //     }
                                //     console.log('sent', result);
                                // });
                            }
                        })
                    ]
                })
            ]);
        }
    });
}

module.exports = { ble };