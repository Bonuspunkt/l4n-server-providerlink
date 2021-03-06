const TlsClient = require('../lib/TlsClient');
const debug = require('debug')('l4n:server:glue:udpScannerToStores');

module.exports = function(resolve) {
    const checkStartCondition = require('../lib/checkStartCondition')(resolve);

    const getClient = protocol => {
        switch (protocol) {
            case 'tls':
                return TlsClient;
        }
    };

    const lobbyRepo = resolve('lobbyRepo');
    const providerUser = resolve('providerUser');
    const publicStore = resolve('publicStore');
    const privateStore = resolve('privateStore');
    publicStore.dispatch(state => ({ ...state, providers: [] }));
    privateStore.dispatch(state => ({ ...state, providers: [] }));

    const merge = entry => state => ({
        ...state,
        providers: state.providers
            .filter(p => p.key !== entry.key)
            .concat([entry])
            .sort((p1, p2) => p1.name > p2.name),
    });

    const remove = entry => state => ({
        ...state,
        providers: state.providers.filter(p => p.key !== entry.key),
    });

    const udpScanner = resolve('udpScanner');

    udpScanner.on('found', info => {
        const key = `${info.protocol}://${info.host}:${info.port}`;

        const alreadyPresent = privateStore.getState().providers.some(p => p.key === key);
        if (alreadyPresent) return;

        const Client = getClient(info.protocol);
        const client = new Client({ ...info, resolve });
        client.on('close', (...args) => {
            debug('close', ...args);
            privateStore.dispatch(remove({ key }));
            publicStore.dispatch(remove({ key }));
        });
        client.on('error', (...args) => debug('error', ...args));

        client.on('status', provider => {
            privateStore.dispatch(merge({ name: provider.name, key, client }));
            publicStore.dispatch(merge({ ...provider, key }));

            // check for waiting lobbies
            publicStore
                .getState()
                .lobbies.filter(lobby => lobby.provider === provider.name)
                .forEach(lobby => checkStartCondition(lobby));
        });
        client.on('update', (...args) => debug('update', ...args));
        client.on('spawned', ({ lobbyId, privateInfo }) => {
            lobbyRepo.changeState({ lobbyId, newState: 2, userId: providerUser.id, privateInfo });
        });
        client.on('destroy', ({ lobbyId }) => {
            debug(`destroy lobbyId: ${lobbyId}`);
            lobbyRepo.destroy({ lobbyId, userId: providerUser.id });
        });
    });

    udpScanner.start();
};
