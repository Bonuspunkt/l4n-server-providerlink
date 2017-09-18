import CreateProviderLobby from './view/CreateProviderLobby';

const routes = [
    {
        pattern: '/provider/:provider/game/:game',
        Component: CreateProviderLobby,
    },
];

export default routes;
