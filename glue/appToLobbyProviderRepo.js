module.exports = resolve => {
    const app = resolve('app');
    const lobbyRepo = resolve('lobbyRepo');
    const lobbyProviderRepo = resolve('lobbyProviderRepo');
    const providerUser = resolve('providerUser');

    app.post('/provider/:provider/server/:server', (req, res) => {
        const { body: lobby, user } = req;
        const { provider, server } = req.params;

        lobby.userId = providerUser.id;

        const createdLobby = lobbyRepo.create({ lobby, user });
        lobbyProviderRepo.insert({
            lobbyId: createdLobby.id,
            provider,
            server,
        });

        res.redirect(`/lobby/${createdLobby.id}`);
    });
};
