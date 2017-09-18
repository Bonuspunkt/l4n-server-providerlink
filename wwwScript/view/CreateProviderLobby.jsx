import React from 'react';

import DefaultLayout from 'l4n-server/wwwScript/view/layout/Default';
import GameHeader from 'l4n-server/wwwScript/component/GameHeader';
import LobbyDefinition from '../component/LobbyDefinition';

const CreateProviderLobby = props => {
    const { provider, game } = props;

    return (
        <DefaultLayout {...props} title={'Create Lobby'}>
            <LobbyDefinition {...props}>
                <center>
                    <GameHeader {...game} />
                    <div>hosted by {provider.name}</div>
                </center>
            </LobbyDefinition>
        </DefaultLayout>
    );
};

export default CreateProviderLobby;
