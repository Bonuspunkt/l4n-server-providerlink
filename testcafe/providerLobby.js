import { Selector, ClientFunction } from 'testcafe';

import register from 'l4n-server/testcafe/screen/register';
import login from 'l4n-server/testcafe/screen/login';
import lobby from 'l4n-server/testcafe/screen/lobby'
import availableServers from './screen/component/availableServers';
import createProviderLobby from './screen/createProviderLobby';

const getPathname = ClientFunction(() => window.location.pathname);

fixture('providerLobby lifecycle');

test.before(async t => {
    const username = `user-${Date.now()}`;
    const password = 'password';

    await register.register({ username, password });

    t.ctx = { ...t.ctx, username, password };
})('providerLobby lifecycle', async t => {
    const { username, password } = t.ctx;
    await login.login({ username, password });

    await t.click(availableServers.el.openLobby);

    await createProviderLobby.fill({ lobbyName: 'test' });

    const pathname = await getPathname();

    await t.navigateTo('http://localhost:8080/');

    const lobbyLink = Selector(`a[href="${pathname}"]`);
    await t.click(lobbyLink);

    await t.click(lobby.el.leave);

    await t.expect(lobbyLink.count).eql(0);
});