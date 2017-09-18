# l4n-server-providerLink
- generate keys (see `l4n-cert`)

## config
``` js
const { readFileSync } = require('fs');

module.exports = {
    plugins: [
        // ...
        'l4n-server-providerlink',
    ],
    // ...
    tlsClient: {
        ca: undefined, // readFileSync('.keys/ca-crt.pem'),
        key: undefined, // readFileSync('.keys/client-key.pem'),
        cert: undefined, // readFileSync('.keys/client-crt.pem'),
        checkServerIdentity: (host, cert) => {
            // allow signed for ip
            if (host === cert.subject.CN) return;
            throw Error('invalid cert');
        },
    },
    udpScanner: {
        hostPort: 20000,
        targetPort: 19999,
        scanInterval: 30e3,
    },
};
```
