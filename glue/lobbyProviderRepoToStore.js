module.exports = resolve => {
    const store = resolve('publicStore');
    const lobbyProviderRepo = resolve('lobbyProviderRepo');

    const lobbyProviders = lobbyProviderRepo.allOpen();
    store.dispatch(state => ({
        ...state,
        lobbies: state.lobbies.map(lobby => {
            const lobbyProvider = lobbyProviders.find(lb => lb.lobbyId === lobby.id);
            if (!lobbyProvider) return lobby;
            const { provider, definition } = lobbyProvider;
            return { ...lobby, provider, definition };
        }),
    }));

    lobbyProviderRepo.on('create', lobbyProvider =>
        store.dispatch(state => ({
            ...state,
            lobbies: state.lobbies.map(lobby => {
                if (lobby.id !== lobbyProvider.lobbyId) return lobby;
                const { provider, definition } = lobbyProvider;
                return { ...lobby, provider, definition };
            }),
        })),
    );
};
