const { EventEmitter } = require('events');

const createTable = `
CREATE TABLE IF NOT EXISTS LobbyProvider (
    lobbyId INTEGER NOT NULL,
    provider TEXT NOT NULL,
    server TEXT NOT NULL,

    FOREIGN KEY(lobbyId) REFERENCES Lobby(id)
);`;

class LobbyProviderRepo extends EventEmitter {
    constructor(resolve) {
        super();

        const db = resolve('db');
        db.exec(createTable);

        this.statements = {
            insertLobbyProvider: db.prepare(`
                INSERT INTO LobbyProvider (lobbyId, provider, server)
                VALUES ($lobbyId, $provider, $server)`),
            byLobbyId: db.prepare(`SELECT * FROM LobbyProvider WHERE lobbyId = $lobbyId`),
            allOpen: db.prepare(`
                 SELECT * FROM LobbyProvider
                  WHERE EXISTS (
                         SELECT * FROM LobbyUser
                          WHERE LobbyUser.lobbyId = LobbyProvider.lobbyId AND left is null
                        )`),
        };
    }

    allOpen() {
        const { allOpen } = this.statements;
        return allOpen.all();
    }

    insert(lobbyProvider) {
        const { byLobbyId, insertLobbyProvider } = this.statements;
        insertLobbyProvider.run(lobbyProvider);

        const result = byLobbyId.get({ lobbyId: lobbyProvider.lobbyId });

        this.emit('create', result);
    }
}

module.exports = LobbyProviderRepo;
