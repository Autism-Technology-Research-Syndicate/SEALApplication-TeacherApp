const net = require('net');

const findAvailablePort = async(startPort) => {

    let port = startPort;

    return new Promise((resolve, reject)=> {
        const checkPort = (portCheck) => {
            const server = net.createServer();
            server.unref();
            server.on('error', (err) => {
                if (err.code === 'EADDRINUSE') {
                    checkPort(portCheck + 1);
                } else{
                    reject(err);
                }
            });

            server.listen(portCheck, () => {
                server.close(() => resolve(portCheck));

            });

        }
        
        checkPort(port);

    
    });


}


module.exports = findAvailablePort;