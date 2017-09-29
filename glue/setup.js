const id = -1;
const name = 'Pʀᴏᴠɪᴅᴇʀ';
const bio = `[l4n-server-providerlink](https://github.com/Bonuspunkt/l4n-server-providerlink)`;

module.exports = ({ resolve, register }) => {
    const userRepo = resolve('userRepo');

    let providerUser = userRepo.byId(id);
    if (!providerUser) {
        providerUser = userRepo.registerSystemUser({ id, name, bio });
    }

    register('providerUser', () => providerUser);
};
