module.exports = resolve => {
    const app = resolve('app');
    const lobbyRepo = resolve('lobbyRepo');

    app.post('/provider/:provider/game/:game', (req, res) => {
        const { provider, game } = req.params;

        //lobbyRepo.createLobby

        //lobbyProvider.create({ lobbyId, provider, game })
        //lobbyProvider.join({requestUser})
        //lobbyProvider.part({ provider })

        res.redirect(`/lobby/${lobbyId}`);
    });
};
