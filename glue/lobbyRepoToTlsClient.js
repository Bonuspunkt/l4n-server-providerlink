module.exports = resolve => {
    const lobbyRepo = resolve('lobbyRepo');
    const checkStartCondition = require('../lib/checkStartCondition')(resolve);

    lobbyRepo.on('create', lobby => {
        setImmediate(() => checkStartCondition(lobby));
    });
    lobbyRepo.on('join', ({ lobbyId }) => {
        const lobby = lobbyRepo.byId(lobbyId);
        setImmediate(() => checkStartCondition(lobby));
    });
};
