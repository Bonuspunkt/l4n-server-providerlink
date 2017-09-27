import React from 'react';

if (process.env.BROWSER) require('./AvailableServers.styl');

const AvailableDefinition = ({ provider, server, showOpenLobby }) => {
    const openLobby = showOpenLobby ? (
        <a className="button" href={`/provider/${provider}/game/${server.id}`}>
            open lobby
        </a>
    ) : null;

    return (
        <li className="availableServer">
            <div className="availableServer-provider">{provider}</div>
            <div className="availableServer-name">{server.lobby.game}</div>
            <div className="availableServer-mode">{server.lobby.mode}</div>
            <div className="availableServer-action">{openLobby}</div>
        </li>
    );
};

const AvailableServers = props => {
    const { providers, user } = props;
    const servers = providers
        .map(provider => provider.servers.map(server => ({ provider: provider.name, server })))
        .reduce((prev, curr) => prev.concat(curr), []);

    return (
        <article>
            <h2>Available Servers</h2>
            <ul className="availableServers">
                <li className="availableServer lobbyRowHeader">
                    <div className="availableServer-provider">Provider</div>
                    <div className="availableServer-name">Game</div>
                    <div className="availableServer-mode">Mode</div>
                    <div className="availableServer-action" />
                </li>
                {servers.map(({ provider, server }) => (
                    <AvailableDefinition
                        key={`${provider.name}:${server.id}`}
                        provider={provider}
                        server={server}
                        showOpenLobby={user}
                    />
                ))}
            </ul>
        </article>
    );
};

export default AvailableServers;
