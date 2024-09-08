const os = require('os');

function getIPAddress() {

    const interfaces = os.networkInterfaces();
    for(const iface of Obeject.values(interfaces)){
        for(const details of iface){
            if(details.family == 'IPv4' && !details.internal){
                return details.address;

            }
        }


        return 'localhost';
    }


}

module.exports = getIPAddress;