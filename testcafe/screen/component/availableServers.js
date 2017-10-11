import { Selector } from 'testcafe';

const availableServersEl = Selector('.availableServers');
const openLobbyEl = Selector('.availableServer-action a');

const availableServers = {
    get el() {
        return {
            get availableServers() {
                return availableServersEl;
            },
            get openLobby() {
                return openLobbyEl;
            }
        }
    }
}

export default availableServers;