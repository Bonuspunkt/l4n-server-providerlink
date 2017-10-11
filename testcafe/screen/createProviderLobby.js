import { Selector, t } from 'testcafe';

const lobbyNameEl = Selector('[name="name"]');
const submitEl = Selector('[data-action="createProviderLobby"]');

const createProviderLobby = {
    get els() {
        return {
            get lobbyName() {
                return lobbyNameEl;
            },
            get submit() {
                return submitEl;
            },
        };
    },

    async fill({ lobbyName }) {
        await t.typeText(lobbyNameEl, lobbyName);
        await t.click(submitEl);
    }
};

export default createProviderLobby;