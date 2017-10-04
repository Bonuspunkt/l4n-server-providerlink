const debug = require('debug')('l4n:server:providerLink:glue:lobbyRepoToTlsClient');

module.exports = resolve => {
    const providerUser = resolve('providerUser');
    const lobbyRepo = resolve('lobbyRepo');
    const lobbyProviderRepo = resolve('lobbyProviderRepo');
    const privateStore = resolve('privateStore');

    const checkStartCondition = lobby => {
        setImmediate(() => {
            const lobbyProvider = lobbyProviderRepo.byLobbyId(lobby.id);
            if (!lobbyProvider) return;

            if (lobby.state === 0 && lobby.users.length >= lobby.minPlayers) {
                debug(`spawning server for lobby ${lobby.id}`);

                const lobbyProvider = lobbyProviderRepo.byLobbyId(lobby.id);
                const { providers } = privateStore.getState();

                const provider = providers.find(p => p.name === lobbyProvider.provider);
                provider.client.spawn({
                    id: lobby.id,
                    name: lobby.name,
                    game: lobby.game,
                    mode: lobby.mode,
                });

                lobbyRepo.changeState({
                    lobbyId: lobby.id,
                    newState: 1,
                    userId: providerUser.id,
                });
            }
        });
    };

    lobbyRepo.on('create', lobby => {
        checkStartCondition(lobby);
    });
    lobbyRepo.on('join', ({ lobbyId }) => {
        const lobby = lobbyRepo.byId(lobbyId);
        checkStartCondition(lobby);
    });
};
