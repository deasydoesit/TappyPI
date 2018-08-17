var bleno = require('bleno');
var Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d389caf107ea4b5ea660d1f636ebb772"));
 
// Advertise BLE address after powering up BLE module
bleno.on('stateChange', function(state) {
    console.log('State change: ' + state);
    if (state === 'poweredOn') {
        bleno.startAdvertising('MyDevice',['12ab']);
    } else {
        bleno.stopAdvertising();
    }
});
 
// Listen for accepted connection and alert 
bleno.on('accept', function(clientAddress) {
    console.log("Accepted connection from address: " + clientAddress);
});
 
// Listen for disconnect and alert
bleno.on('disconnect', function(clientAddress) {
    console.log("Disconnected from address: " + clientAddress);
});
 
// Listen for advertisingStart, then create a new service and characteristics
bleno.on('advertisingStart', function(error) {
    if (error) {
        console.log("Advertising start error:" + error);
    } else {
        console.log("Advertising start success");
        bleno.setServices([
            
            // Create new service
            new bleno.PrimaryService({
                uuid : '12ab',
                characteristics : [
                    
                    // Create new characteristic within that service
                    new bleno.Characteristic({
                        value : null,
                        uuid : '34cd',
                        properties : ['notify', 'read', 'write'],
                        
                        // Create read functionality e.g., where endpoints can read data from Pi
                        onReadRequest : function(offset, callback) {
                            console.log("Read request received");
                            callback(this.RESULT_SUCCESS, Buffer("Echo: " + (this.value ? this.value.toString("utf-8") : "")));
                        },
                        
                        // Create write functionality e.g., where endpoints can send data to Pi
                        onWriteRequest : function(data, offset, withoutResponse, callback) {
                            this.value = data;
                            console.log(typeof this.value);
                            // var serializedTx = this.value.toString(16);
                            // console.log(data);
                            // console.log('Write request: value = ' + this.value.toString(16));
                            // callback(this.RESULT_SUCCESS);

                            // web3.eth.sendSignedTransaction('0x' + serializedTx, function(err, result) {
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