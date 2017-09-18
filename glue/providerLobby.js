module.exports = resolve => {
    const httpServer = resolve('httpServer');
    const lobbyRepo = resolve('lobbyRepo');

    httpServer.post('/provider/:provider/game/:game', (req, res) => {
        const { provider, game } = req.params;
        const lobbyId = lobbyRepo.create({
            ...req.body,
            provider,
            game,
            user: req.user,
        });
        res.redirect(`/lobby/${lobbyId}`);
    });
};
