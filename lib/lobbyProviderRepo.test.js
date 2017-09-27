require('tap').mochaGlobals();
const { expect } = require('chai');
const { Spy } = require('l4n-common');

const Database = require('better-sqlite3');
const UserRepo = require('l4n-server/lib/userRepo');
const LobbyRepo = require('l4n-server/lib/lobbyRepo');
const LobbyProviderRepo = require('./lobbyProviderRepo');

const getResolve = () => {
    const db = new Database(String(Date.now()), { memory: true });
    return name => {
        switch (name) {
            case 'db':
                return db;
            default:
                throw Error('not supported');
        }
    };
};

describe('lobbyProvider', () => {
    it('lifecycle', async () => {
        const spy = new Spy();
        const resolve = getResolve();
        const userRepo = new UserRepo(resolve);
        const lobbyRepo = new LobbyRepo(resolve);
        const lobbyProviderRepo = new LobbyProviderRepo(resolve);
        lobbyProviderRepo.on('create', spy);

        const password = 'x';

        const user1 = await userRepo.register({ name: 'user', password });
        const sysUser = await userRepo.registerSystemUser({ id: -1, name: 'sys' });

        const lobby = lobbyRepo.create({
            lobby: {
                game: 'game',
                userId: sysUser.id,
                name: 'lobby Name',
                minPlayers: 2,
                maxPlayers: 4,
            },
            user: user1,
        });

        const provider = 'provider';
        const definition = 'definition';
        lobbyProviderRepo.insert({ lobbyId: lobby.id, provider, definition });
        expect(spy.called.length).to.equal(1);

        const [lobbyProvider] = lobbyProviderRepo.allOpen();
        expect(lobbyProvider).to.deep.equal({ lobbyId: lobby.id, provider, definition });
    });
});
