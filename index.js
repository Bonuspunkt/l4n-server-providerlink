const LobbyProviderRepo = require('./lib/lobbyProviderRepo');
const UdpScanner = require('./lib/udpScanner');

module.exports = ({ resolve, register }) => {
    const scanner = new UdpScanner(resolve);
    register('udpScanner', () => scanner);

    const lobbyProviderRepo = new LobbyProviderRepo(resolve);
    register('lobbyProviderRepo', () => lobbyProviderRepo);

    require('./glue/lobbyProviderToApp')(resolve);
    require('./glue/lobbyProviderToStore')(resolve);
    require('./glue/udpScannerToStores')(resolve);
};
