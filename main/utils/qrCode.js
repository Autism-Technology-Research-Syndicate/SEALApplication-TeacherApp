
const {getIPAddress} = require('./ip');
const qrcode = require('qrcode');


const generateQrcode = async(port) => {

    const ip = getIPAddress;
    const Infom = `http://${ip}:${port}`;
    const qrcodeURL = await qrcode.toDataURL(Infom);
    return qrcodeURL;



}

module.exports = generateQrcode;