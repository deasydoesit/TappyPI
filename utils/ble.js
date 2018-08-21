var bleno = require('bleno');
var sendTx = require('./sendTx');

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
                            
                            onWriteRequest : function(data, offset, withoutResponse, callback) {
                                this.value = data;
                                sendTx(this.value);
                                callback(this.RESULT_SUCCESS);
                            }
                        })
                    ]
                })
            ]);
        }
    });
}

module.exports = { ble };