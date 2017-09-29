import viewRegistry from 'l4n-server/wwwScript/lib/viewRegistry';
import AvailableServers from './component/AvailableServers';
viewRegistry.register('home', AvailableServers);

import CreateProviderLobby from './view/CreateProviderLobby';

const routes = [
    {
        pattern: '/provider/:provider/server/:server',
        Component: CreateProviderLobby,
    },
];

export default routes;
