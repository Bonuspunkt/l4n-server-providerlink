import React from 'react';

import DefaultLayout from 'l4n-server/view/layout/Default';
import CsrfToken from 'l4n-server/component/CsrfToken';
import CommonMark from 'l4n-server/component/CommonMark';

const CreateProviderLobby = props => {
    const { providers, provider: providerName, game: gameId } = props;

    const provider = providers.find(provider => provider.name === providerName);
    if (!provider) {
        return (
            <DefaultLayout {...props} title={'Create Lobby'}>
                <h1>provider lost</h1>
            </DefaultLayout>
        );
    }
    const server = provider.servers.find(d => d.id === gameId);
    if (!server) {
        return (
            <DefaultLayout {...props} title={'Create Lobby'}>
                <h1>definition lost</h1>
            </DefaultLayout>
        );
    }

    const { lobby } = server;

    return (
        <DefaultLayout {...props} title={'Create Lobby'}>
            <h1>create lobby</h1>
            <form method="POST" action={`/provider/${providerName}/game/${server.id}`}>
                <CsrfToken {...props} />
                <label className="formField">
                    <span className="formField-label">game</span>
                    <input
                        className="formField-input"
                        type="text"
                        name="game"
                        readOnly
                        value={lobby.game}
                    />
                </label>
                <label className="formField">
                    <span className="formField-label">mode</span>
                    <input
                        className="formField-input"
                        type="text"
                        name="mode"
                        readOnly
                        value={lobby.mode}
                    />
                </label>
                <label className="formField">
                    <span className="formField-label">lobby name</span>
                    <input
                        className="formField-input"
                        type="text"
                        name="name"
                        required
                        placeholder="ex. real life simulator 2020"
                    />
                </label>
                <h3>spawn conditions</h3>
                <label className="formField">
                    <span className="formField-label">min players</span>
                    <input
                        className="formField-input"
                        type="number"
                        name="minPlayers"
                        readOnly
                        value={lobby.minPlayers}
                    />
                </label>
                <h3>infos</h3>
                <label className="formField">
                    <span className="formField-label">max players</span>
                    <input
                        className="formField-input"
                        type="number"
                        name="maxPlayers"
                        readOnly
                        value={lobby.maxPlayers}
                    />
                </label>
                <label className="formField">
                    <span className="formField-label">info</span>
                    <input type="hidden" name="publicInfo" value={lobby.publicInfo} />
                    <CommonMark className="formField-input" text={lobby.publicInfo} />
                </label>
                <label className="formField">
                    <span className="formField-label" />
                    <button type="submit">create lobby</button>
                </label>
            </form>
        </DefaultLayout>
    );
};

export default CreateProviderLobby;
