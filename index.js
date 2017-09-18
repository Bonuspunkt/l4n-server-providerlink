const UdpScanner = require('./lib/udpScanner');

module.exports = ({ resolve, register }) => {
    const scanner = new UdpScanner(resolve);
    register('udpScanner', () => scanner);

    require('./glue/udpScannerToStores')(resolve);
};
