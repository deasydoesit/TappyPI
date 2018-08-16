var bleno = require('bleno');
var Buffer = require('buffer').Buffer;
 
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
                        
                        // Send a message back to the client with the characteristic's value
                        onReadRequest : function(offset, callback) {
                            console.log("Read request received");
                            callback(this.RESULT_SUCCESS, Buffer("Echo: " + (this.value ? this.value.toString("utf-8") : "")));
                        },
                        
                        // Accept a new value for the characterstic's value
                        onWriteRequest : function(data, offset, withoutResponse, callback) {
                            console.log(data);
                            console.log('Write request: value = ' + data.toString('utf8'));
                            callback(this.RESULT_SUCCESS);
                        }
 
                    })
                    
                ]
            })
        ]);
    }
});